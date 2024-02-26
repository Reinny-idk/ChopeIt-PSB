import express from "express";
import { checkUserChopes, createChope, deleteChopeByID, getAllChopes, getChopeByID } from "../controllers/chope-controller.js";

const chopeRouter = express.Router();

chopeRouter.post("/", createChope);
chopeRouter.get("/:id", getChopeByID);
chopeRouter.get("/", getAllChopes)
chopeRouter.delete("/:id", deleteChopeByID);
chopeRouter.post("/check", checkUserChopes);

export default chopeRouter;