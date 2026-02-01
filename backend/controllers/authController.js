import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// signup controller
export const signup = async (req,res) =>{
    try{
        const {username,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({username,email,password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User created successfully."})
    }catch(err){
        if(err.code===11000){
            return res.status(400).json({message: "Username or email already exists"})
        }
        return res.status(500).json({message: "server error"})
    }
}


//login controller
export const login = async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
           return res.status(400).json({message:"No such username"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Wrong password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).json({token,username: user.username})
    }catch(err){
        res.status(500).json({message: "server error"})
    }
}