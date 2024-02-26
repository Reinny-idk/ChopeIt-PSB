import express from "express";
import { deleteUser, getAllUsers, getUserChopes, logIn, logOut, signUp, updateUser } from "../controllers/user-controller.js";
import { verifyRoles } from "../controllers/auth.js";
import { ROLES_LIST } from "../config/roles-list.js";

const userRouter = express.Router();

// userRouter.get("/", verifyRoles(ROLES_LIST.Admin), getAllUsers);
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", logIn);
userRouter.get("/chopes", getUserChopes);
userRouter.get("/logout", logOut);

export default userRouter;