const Hero = ({ darkMode }) => {
    return (
        <section
            className={`h-[80vh] flex flex-col justify-center items-center transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
                }`}
        >
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center px-4 py-2 font-bold rounded-full text-4xl flex items-center space-x-2 mb-1">
                Welcome to rcmndr
            </span>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Discover Your Next
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"> Favorite Movie</span>
            </h1>
            <p className={` max-w-4xl mx-auto text-lg md:text-xl ${darkMode?"text-gray-300":"text-gray-900"} leading-relaxed`}>
  Not every story needs searching some are waiting to find <span className="text-indigo-400 font-medium">you.</span><br />
  Let <span className="text-purple-400 font-semibold">rcmndr</span> uncover the films that echo your emotions, 
  mirror your moments, and reignite your love for cinema.
  From timeless classics to hidden masterpieces, our AI knows the stories 
  that will move you scene by scene, frame by frame.
</p>

        </section>
    );
};

export default Hero;
