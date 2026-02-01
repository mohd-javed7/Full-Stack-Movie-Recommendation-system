import pandas as pd
import numpy as np
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import requests
from nltk.stem.porter import PorterStemmer
from dotenv import load_dotenv
import os
import pathlib




ps = PorterStemmer() #stem
tfid = TfidfVectorizer(max_features=8000, stop_words='english')
load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR.parent / "data"

Movies = pd.read_csv(DATA_DIR / "movies_data.csv")
with open(DATA_DIR / "vectors.pkl", "rb") as f:
    vectors = pickle.load(f)
with open(DATA_DIR / "similarity.pkl", "rb") as f:
    similarity = pickle.load(f)
with open(DATA_DIR / "tfid.pkl", "rb") as f:
    tfid = pickle.load(f)

    if not (len(Movies) == vectors.shape[0] == similarity.shape[0]):
        print("Mismatch detected! Rebuilding vectors & similarity...\n")
        tfid = TfidfVectorizer(max_features=5000, stop_words='english')
        vectors = tfid.fit_transform(Movies['tags']).toarray()
        similarity = cosine_similarity(vectors)
        with open(os.path.join(DATA_DIR, "vectors.pkl"), "wb") as f:
            pickle.dump(vectors, f, protocol=pickle.HIGHEST_PROTOCOL)
        with open(os.path.join(DATA_DIR, "similarity.pkl"), "wb") as f:
            pickle.dump(similarity, f, protocol=pickle.HIGHEST_PROTOCOL)
        print("Rebuild complete. Shapes now synced:")
        print("Movies:", Movies.shape)
        print("Vectors:", vectors.shape)
        print("Similarity:", similarity.shape)

# to get the movie dynamically from the tmdb_api if the movie doesn't exist.
def getMovie(movie):
    try:
        url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={movie}"
        response = requests.get(url)
        data = response.json()
        if data['results']:
            movie_id = data['results'][0]['id']
            details_url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}&append_to_response=credits,keywords"
            details = requests.get(details_url).json()
            return details
        else:
            return f"No search results for {movie}"
    except Exception as e:
        return (f"Error finding the {movie}: {e}")

#clean the movie that came from the getMovie()
def clean_Details(details):
    
    movie_id = details.get('id',None)
    title = details.get('title','').lower()
    
    overview = details.get('overview', '').lower()
    genres = [g['name'].lower().replace(" ", "") for g in details.get('genres', [])]
    keywords = [k['name'].lower().replace(" ", "") for k in details.get('keywords', {}).get('keywords', [])]
    cast = [c['name'].lower().replace(" ", "") for c in details.get('credits', {}).get('cast', [])[:5]]
    crew = [c['name'].lower().replace(" ", "") for c in details.get('credits', {}).get('crew', []) if c.get('job') == 'Director']
    tagline = details.get('tagline','').lower()

    tags = " ".join(genres + keywords + cast + crew + [overview]+[tagline])
    cleaned = pd.DataFrame([{
        'id': movie_id,
        'title': title,
        'tags': tags
    }])


    def stem(text):
        y=[]
        for i in text.split():
         y.append(ps.stem(i))

        return " ".join(y)

    cleaned['tags'] = cleaned['tags'].apply(stem)
    return cleaned

# the main function that would recommend movies.
def recommend(movie):
    global Movies, similarity,vectors
    movie = movie.lower()

    # If not in dataset
    if movie not in Movies['title'].values:
        details = getMovie(movie)
        if not details:
            print(f"No search results for '{movie}'.")
            return
        
        #details is a dict (valid API response)
        if isinstance(details, dict):
            new_Movie = clean_Details(details)
            if new_Movie["title"][0]!=movie:
                return (f"Do you mean '{new_Movie['title'].iloc[0]}'")
            new_tags = new_Movie['tags'].iloc[0]

            #tranform only the new movie tags and caluclate similarity with existing matrix
            new_vector = tfid.transform([new_tags]).toarray()
            new_sim = cosine_similarity(new_vector, vectors)[0]
            
            #append the new movie and vector
            Movies = pd.concat([Movies, new_Movie], ignore_index=True)
            Movies.drop_duplicates(subset='title', inplace=True)
            Movies.reset_index(drop=True, inplace=True)
            vectors = np.vstack([vectors, new_vector])

            #adding the new sim to the similarity row and column
            similarity = np.vstack([similarity, new_sim])
            new_col = np.append(new_sim, 1.0).reshape(-1, 1)
            similarity = np.hstack([similarity, new_col])

            target_path = (DATA_DIR / "movies_data.csv").resolve()
            Movies.to_csv(target_path, index=False)
            print("Saved to:", target_path)
            with open(DATA_DIR /"vectors.pkl", "wb") as f:
                pickle.dump(vectors, f, protocol=pickle.HIGHEST_PROTOCOL)
            with open(DATA_DIR /"similarity.pkl", "wb") as f:
                pickle.dump(similarity, f, protocol=pickle.HIGHEST_PROTOCOL)
        else:
            print(details)
            return
        


    movie_row = Movies[Movies['title'] == movie]
    movie_index = movie_row.index[0]
    distance = similarity[movie_index]
    movie_list = sorted(list(enumerate(distance)), reverse=True, key=lambda x: x[1])[1:6]

    recommended_movies = [Movies.iloc[i[0]].title for i in movie_list]
    return recommended_movies

