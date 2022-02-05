import express from "express";
import {
    getAllUsers,
    addUser,
    loginUser,
    logoutUser,
    refreshUserToken
} from "../controllers/userController.js"

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.post("/refresh", refreshUserToken)

export { router as usersRoute };