from fastapi import FastAPI, HTTPException
from model.recommender import recommend
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Movie Recommender API")

origins = [
    "http://localhost:5173",  # frontend address
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to the Movie Recommender API!"}


@app.get("/recommend/{movie_name}")
def get_recommendations(movie_name: str):
    try:
        results = recommend(movie_name)
        if isinstance(results, list) and results:
            return {"movie": movie_name, "recommendations": results}
        else:
            # Handle cases where recommend() returns None or a string
            return {"movie": movie_name, "message": str(results) or "No recommendations found."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#to run locally
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
