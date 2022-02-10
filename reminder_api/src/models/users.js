import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    _id: String,
    username: String, 
    password: String,
    email: String,
    refreshToken: String,
}); 

const User = mongoose.model("User", userSchema);

export { User }
