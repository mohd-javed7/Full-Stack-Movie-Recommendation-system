import User from "../models/user.js";

export const addMovie = async(req,res) =>{
    try{
        const {movie} = req.body
        if(!movie){
            return res.status(400).json({message: "Movie not sent"})
        }

        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        user.recentSearches.unshift(movie)
        if(user.recentSearches.length > 5){
            user.recentSearches = user.recentSearches.slice(0,5)
        }
        await user.save()
        res.status(200).json({message: "Movie added"})
    }catch(err){
        res.status(500).json({message: "Server error"})
    }
}

export const getRecentSearches = async (req,res) =>{
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select("username recentSearches");
        if(!user){
            return res.status(400).json({message: "No user found"})
        }

        res.status(200).json({
            username: user.username,
            recentSearches: user.recentSearches
          });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}