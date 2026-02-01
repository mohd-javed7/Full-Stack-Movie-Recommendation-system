import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
import axios from 'axios'

const MovieDetails = ({ darkMode }) => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [cast, setCast] = useState(null)
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
                const creditRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
                setMovie(res.data)
                setCast(creditRes.data.cast.slice(0, 8))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [id])

    const director = cast?.crew?.find(
        (member) => member.job === "director"
      )
    if (!movie) return <p className={`text-3xl min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>Loading</p>

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div
                className="relative h-[60vh] bg-cover bg-center flex"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0"></div>

            </div>

            {/*Details*/}
            <div className={`relative flex flex-col md:flex-row items-start gap-8 px-6 md:px-16  z-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

                <div className="w-[200px] shrink-0">
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        genre={movie.genres?.[0]?.name}
                        image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                        rating={movie.vote_average?.toFixed(1)}
                        year={movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                        id={movie.id}
                    />
                </div>

                {/* Details */}
                <div className="flex-1 md:mt-10">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    {movie.tagline && (
                        <p className="italic text-indigo-400 mb-3">"{movie.tagline}"</p>
                    )}

                    <p
                        className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            } leading-relaxed`}
                    >
                        {movie.overview}
                    </p>
                    <p>
                        <span className="font-semibold">Release:</span>{" "}
                        {movie.release_date}
                    </p>
                    <p>
                        <span className="font-semibold">Runtime:</span>{" "}
                        {movie.runtime} min
                    </p>
                    <p>
                        <span className="font-semibold">Genres:</span>{" "}
                        {movie.genres.map((g) => g.name).join(", ")}
                    </p>
                    <p>
                        <span className='font-semibold'>Director:</span>{" "}
                        {director ? director.name : "Unknown"}
                    </p>
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-3">Top Cast</h2>
                        <div className="flex flex-wrap gap-4">
                            {cast.map((member) => (
                                <div
                                    key={member.cast_id}
                                    className="w-24 text-center"
                                >
                                    <img
                                        src={
                                            member.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                                                : '/placeholder.jpg'
                                        }
                                        alt={member.name}
                                        className="w-24 h-24 object-cover rounded-full mx-auto shadow-md"
                                    />
                                    <p className="mt-2 text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-gray-400">{member.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           <div className={`py-10 flex justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
           <a
                href={movie.homepage}
                target="_blank"
                className="inline-block mt-1 mb-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-full"
              >
                Watch Trailer / Visit Page
              </a>
           </div>
            </div>
    )
}

export default MovieDetails
