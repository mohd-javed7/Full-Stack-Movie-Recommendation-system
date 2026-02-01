import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    recentSearches: {
        type: [String],
        default: []
    }
})

export default mongoose.model("User",userSchema)