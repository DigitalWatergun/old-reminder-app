import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    _id: String,
    active: Boolean,
    changePassword: Boolean,
    username: {type: String, unique: true}, 
    userdisplayname: String,
    password: String,
    email: {type: String, unique: true},
    refreshToken: String,
    registerHash: String,
}); 

const User = mongoose.model("User", userSchema);

export { User }
