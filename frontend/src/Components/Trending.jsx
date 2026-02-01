import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import MovieCard from './MovieCard';
import axios from 'axios';

const Trending = ({ darkMode }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

   
    fetchMovies();
  }, [API_KEY]); // optional dependency for safety

  return (
    <section
      className={`py-15 px-5 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex items-center">
        <h2
          className={`text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Trending Now
        </h2>
        <TrendingUp
          className={`ml-2 w-8 h-8 ${
            darkMode ? 'text-indigo-400' : 'text-indigo-600'
          }`}
        />
      </div>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Popular movies this week
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} genre={movie.genre}
           image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} rating={ movie.vote_average?.toFixed(1)} year={ movie.release_date ? movie.release_date.slice(0, 4) : "N/A"} id={movie.id} />
        ))}
      </div>
    </section>
  );
};

export default Trending;
