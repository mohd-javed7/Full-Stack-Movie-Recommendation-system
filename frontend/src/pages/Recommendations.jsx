import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const Recommendations = ({ darkMode }) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [results, setResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [suggest, setSuggest] = useState("");
  const token = localStorage.getItem("token")
  const location = useLocation()
  const psearchMovie = location.state?.movie
  useEffect(() => {
    if (psearchMovie) {
      setSearchMovie(psearchMovie);
      handleSubmit(); 
    }
  }, [psearchMovie]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_BASE = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    const movieToSearch = psearchMovie || searchMovie;
    if (!movieToSearch.trim()) return;
  
    setLoading(true);
  
    try {
      const response = await axios.get(
        `${API_BASE}/recommend/${encodeURIComponent(movieToSearch)}`
      );
  
      if (token) {
        await axios.post(
          "http://localhost:3000/api/search/add",
          { movie: movieToSearch },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
  
      if (response.data.recommendations) {
        const recommendedMovies = response.data.recommendations;
        setResults(recommendedMovies);
        setSuggest("");
        fetchMovieDetails(recommendedMovies);
      } else if (response.data.message) {
        setResults([]);
        setMovieDetails([]);
        setSuggest(response.data.message);
      }
    } catch (error) {
      console.error(`Error:`, error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchMovieDetails = async (movieNames) => {
    try {
      const promises = movieNames.map(async (name) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`
        );
        return res.data.results[0]; 
      });

      const fetchedMovies = await Promise.all(promises);
      setMovieDetails(fetchedMovies.filter(Boolean)); 
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="rounded-xl p-8 max-w-3xl text-center">
        <h1
          className={`px-6 py-3 md:text-4xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Your Next
          <span className="block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Favorite Film Awaits
          </span>
        </h1>
        <p
          className={`text-lg md:text-xl ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } leading-relaxed`}
        >
          Enter a <span className="text-indigo-400 font-medium">movie</span> you
          enjoyed, and we'll{" "}
          <span className="text-purple-400 font-semibold">recommend</span> 5
          similar films based on genre, cast, and{" "}
          <span className="font-medium">storyline</span>.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          type="text"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          placeholder="Enter a movie name..."
          className={`w-[60vw] md:w-[30vw] pl-10 pr-4 h-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />
        <button
          type="submit"
          className="h-12 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity cursor-pointer font-medium"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-10 mb-5 w-full px-10">
        {suggest && (
          <p className="font-medium text-center text-red-400">{suggest}</p>
        )}

        {loading && <p className="text-center">Loading...</p>}
        {!loading && movieDetails.length > 0 &&(
          <h2 className={`text-lg md:text-xl ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } mb-4`}> <span className="text-purple-500">━━━</span> Recommended Movies</h2>
        )}

        {!loading && movieDetails.length > 0 && (
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {movieDetails.map((m, i) => (
              <MovieCard
                key={i}
                id={m.id}
                title={m.title}
                image={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : ""
                }
                rating={m.vote_average?.toFixed(1)}
                year={
                  m.release_date ? m.release_date.slice(0, 4) : "N/A"
                }
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
