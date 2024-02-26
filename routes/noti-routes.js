import express from "express";
import { deleteNotification, getNotifications, markNotificationAsRead } from "../controllers/noti-controller.js";

const notiRouter = express.Router();

notiRouter.get("/", getNotifications);
notiRouter.delete("/:id", deleteNotification);
notiRouter.post("/:id", markNotificationAsRead);

export default notiRouter;
