import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    _id: String,
    active: Boolean,
    username: String, 
    password: String,
    email: String,
    refreshToken: String,
    registerHash: String,
}); 

const User = mongoose.model("User", userSchema);

export { User }
