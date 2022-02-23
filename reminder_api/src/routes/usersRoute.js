import express from "express";
import {
    getAllUsers,
    addUser,
    loginUser,
    changeUserPassword,
    resetUserPassword,
    logoutUser,
    deleteAccount,
    verifyUserToken,
    refreshUserToken
} from "../controllers/userController.js"

const router = express.Router();

router.route("/")
    .get(getAllUsers)
    .post(addUser)
    .delete(deleteAccount)
router.post("/login", loginUser)
router.post("/update", changeUserPassword)
router.post("/logout", logoutUser)
router.post("/verify", verifyUserToken)
router.post("/refresh", refreshUserToken)
router.post("/reset", resetUserPassword)


export { router as usersRoute };