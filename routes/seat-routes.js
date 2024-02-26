import express from "express";
import { addSeat, checkSeatAvailability, getAllSeats, getSeatsByArea, positionSeat } from "../controllers/seat-controller.js";

const seatRouter = express.Router();

seatRouter.post("/", addSeat);
seatRouter.get("/all", getAllSeats);
seatRouter.post("/area", getSeatsByArea);
seatRouter.post("/availability", checkSeatAvailability);
seatRouter.put("/:id", positionSeat);

export default seatRouter;