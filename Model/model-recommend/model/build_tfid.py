import os
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Get base directory (folder where this file is located)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")

# Use absolute path
Movies = pd.read_csv(os.path.join(DATA_DIR, "movies_data.csv"))

tfid = TfidfVectorizer(max_features=8000, stop_words='english')
vectors = tfid.fit_transform(Movies['tags']).toarray()
similarity = cosine_similarity(vectors)

# Save all files in data folder
with open(os.path.join(DATA_DIR, "tfid.pkl"), "wb") as f:
    pickle.dump(tfid, f)

with open(os.path.join(DATA_DIR, "vectors.pkl"), "wb") as f:
    pickle.dump(vectors, f)

with open(os.path.join(DATA_DIR, "similarity.pkl"), "wb") as f:
    pickle.dump(similarity, f)

