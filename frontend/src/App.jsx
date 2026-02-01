import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Trending from './Components/Trending'
import MovieDetails from './Components/MovieDetails'
import Footer from './Components/Footer'
import Login from './pages/Login'
import Recommendations from './pages/Recommendations'
import Profile from './pages/Profile'
function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  
  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path='/' element={<>
          <Hero darkMode={darkMode}/>
          <Trending darkMode={darkMode}/>
        </>}/>
        <Route path='/movie/:id' element={<MovieDetails darkMode={darkMode}/>}/>
        <Route path='/login' element={<Login darkMode={darkMode}/>}/>
        <Route path='/profile'element={<Profile darkMode={darkMode}/>}/>
        <Route path='/recommendations' element={<Recommendations darkMode={darkMode}/>}/>
      </Routes>
      <Footer darkMode={darkMode}/>
    </Router>
  )
}


export default App
