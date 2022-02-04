import express from "express";
import {
    getAllUsers,
    addUser,
    checkUser
} from "../controllers/userController.js"

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", checkUser)

export { router as usersRoute };