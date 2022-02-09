import express from "express";
import {
    getAllUsers,
    addUser,
    loginUser,
    logoutUser,
    verifyUserToken,
    refreshUserToken
} from "../controllers/userController.js"

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify", verifyUserToken);
router.post("/refresh", refreshUserToken)

export { router as usersRoute };