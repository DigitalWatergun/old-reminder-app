import _ from "lodash";
import {randomBytes} from "crypto"
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, refreshAccessToken } from "../auth.js";
import {
    queryAllUsers, 
    queryUserById,
    queryUserByEmail,
    createUser,
    updateUser,
    removeRegisterHash,
    deleteUser
} from "../services/userService.js";
import { removeReminderByUserId } from "../services/reminderService.js"
import { sendRegistrationEmail, sendTempPassword } from "../emitter/notifications/mailer/mailer.js";


const getAllUsers = async (req, res) => {
    const users = await queryAllUsers();

    if (users) {
        return res.send(users);
    } else  {
        return res.send("No users found")
    }
} 


const addUser = async (req, res) => {
    const user = {
        _id: _.snakeCase(req.body.username),
        active: false,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 15),
        email: req.body.email,
        registerHash: randomBytes(32).toString('hex')
    }
    const result = await createUser(user);
    
    if (result.error) {
        if (result.error.message.includes("E11000 duplicate key error collection")) {
            res.status(500).send("A user with this username already exists.")
        } else {
            res.status(500).send(result.error.message)
        }
    } else {
        await sendRegistrationEmail(user.username, user.email, user.registerHash)
        res.status(201).send(result);
    }
}


const loginUser = async (req, res) => {
    const id = _.snakeCase(req.body.username)
    const user = (await queryUserById(id))[0];

    if (user === undefined) {
        res.status(400).json("The username or password is incorrect.")
        console.log("The user does not exist.")
    } else {
        if (!await bcrypt.compare(req.body.password, user.password)) {
            console.log("The username or password is not correct.")
            res.status(403).send("The username or password is incorrect.")
        } else if (req.body.registerHash !== undefined) {
            if (req.body.registerHash === user.registerHash) {
                console.log("The activation code is correct and the password is correct.");
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                user["refreshToken"] = refreshToken
                user["active"] = true
                await updateUser(user)
                await removeRegisterHash(user)
                res.json({ userId: user._id, username: user.username, accessToken: accessToken, refreshToken: refreshToken });
            } else {
                res.status(401).send("The activation code is incorrect.")
            }
        } else if (!user.active){
            res.status(401).send("The user needs to be activated. Please check your email for the activation code.")
        } else {
            console.log("The password is correct.");
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            user["refreshToken"] = refreshToken
            await updateUser(user)
            res.json({ userId: user._id, username: user.username, accessToken: accessToken, refreshToken: refreshToken});
        }
    }    
}


const changeUserPassword = async (req, res) => {
    const id = req.body.userId; 
    const user = (await queryUserById(id))[0];

    if (user === undefined) {
        res.status(400).send("Unable to find user")
    } else {
        if (!await bcrypt.compare(req.body.currentPassword, user.password)) {
            res.status(403).send("The current password is incorrect.")
        } else {
            console.log("The password is correct.");
            const newPassword = await bcrypt.hash(req.body.newPassword, 15)
            user["password"] = newPassword;
            await updateUser(user)
            res.sendStatus(200);
        }
    }
}


const resetUserPassword = async (req, res) => {
    const user = await queryUserByEmail(req.body.email)
    
    if (user === null || user === undefined) {
        res.status(401).send("This account does not exist. Please make a new account.")
    } else {
        if (req.body.username === user.username) {
            const tempPass = randomBytes(8).toString('hex')
            user["password"] = await bcrypt.hash(tempPass, 15)
            await updateUser(user)
            await sendTempPassword(user.username, user.email, tempPass)
            res.send("A temporary password has been sent to your email.")
        }
    }
}


const logoutUser = async (req, res) => {
    const user = (await queryUserById(req.body.userId))[0];
    user["refreshToken"] = ""
    await updateUser(user)
    res.send("User has been logged out.")
}


const deleteAccount = async (req, res) => {
    try {
        await removeReminderByUserId(req.body.userId)
        const result = await deleteUser(req.body.userId)
        if (result.deletedCount === 1) {
            res.send(result);
        } else {
            res.status(500).send("Unable to delete user.")
        }
    } catch (err) {
        res.send(err);
    }
}


const verifyUserToken = async (req, res) => {
    const token = req.body.token;

    if (verifyAccessToken(token)) {
        res.send(true);
    } else {
        res.send(false);
    }
}


const refreshUserToken =  async (req, res) => {
    const user = (await queryUserById(req.body.userId))[0];
    const refreshToken = req.body.token;

    if (refreshToken === null) {
        res.sendStatus(401).send("No token found.")
    } 
    
    if (user['refreshToken'] !== refreshToken) {
        res.sendStatus(403).send("User tokens do not match.")
    }

    const accessToken = refreshAccessToken(refreshToken)
    res.json({accessToken : accessToken});
}


export {
    getAllUsers,
    addUser,
    loginUser,
    changeUserPassword,
    resetUserPassword,
    logoutUser,
    deleteAccount,
    verifyUserToken,
    refreshUserToken
}