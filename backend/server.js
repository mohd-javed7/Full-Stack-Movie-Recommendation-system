import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from "./routes/AuthRoute.js"
import searchRoute from "./routes/searchRoute.js"
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())



mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log('MongoDB connected'))
        .catch(()=> console.log("error while connecting with DB!!!"))

app.use('/api/auth',userRoute) // mounting the auth routes
app.use('/api/search',searchRoute) // mounting the seacrh route


app.get('/',(req,res)=>{
    res.send("hello from express")
})

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})