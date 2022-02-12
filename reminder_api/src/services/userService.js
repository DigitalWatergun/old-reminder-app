import { User } from "../models/users.js"


const queryAllUsers = async () => {
    const users = await User.find({})

    return users;
};


const queryUserById = async (id) => {
    const user = await User.find({_id: id});

    return user;
}


const createUser = async (data) => {
    try {
        const newUser = User({
            _id: data._id,
            active: data.active,
            username: data.username, 
            password: data.password,
            refreshToken: data.refreshToken,
            email: data.email,
            registerHash: data.registerHash
        })

        await newUser.save();

        return `Successfully added new user ${data.username}.`
    } catch(err) {
        return {error: err};
    }
};


const updateUser = async (data) => {
    const user = await User.findByIdAndUpdate(data._id, data)

    return user;
}


const removeRegisterHash = async (data) => {
    const user = await User.findByIdAndUpdate(data._id, {$unset: {registerHash: ""}})
    return user
}


const deleteUser = async (userId) => {
    const result = await User.deleteOne({_id: userId})

    return result
}


export {
    queryAllUsers, 
    queryUserById,
    createUser,
    updateUser,
    removeRegisterHash,
    deleteUser
}