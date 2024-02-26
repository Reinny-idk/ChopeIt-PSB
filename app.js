import express from "express";
import mongoose, { startSession } from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import chopeRouter from "./routes/chope-routes.js";
import seatRouter from "./routes/seat-routes.js";
import notiRouter from "./routes/noti-routes.js";
import cors from "cors";
import session from "express-session";
import connectMongo from "connect-mongo";
import authRouter from "./routes/auth-route.js";
import { verifyRoles, verifyJWT } from "./controllers/auth.js";
import cron from "node-cron";
import { cleanupChopes } from "./controllers/chope-controller.js";
import { createReminder } from "./controllers/noti-controller.js";



dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.kruzfk7.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    const mongoStore = connectMongo(session);

    // Middlewares
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({mongooseConnection: mongoose.connection}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            // secure: false,
            // path: "/",
            // domain: "localhost:5000",
        }, //2 hours
    }));

    app.use("/user", userRouter);
    // app.use("/auth", authRouter)
    // app.use("/admin", adminRouter);
    app.use("/seat", seatRouter);
    app.use("/chope", chopeRouter);
    app.use("/noti", notiRouter);

    cron.schedule("*/30 * * * *", () => {   // Every half an hour
        cleanupChopes();    // Cleanup past chopes 
        createReminder();   // Scheduled reminders
    });

    app.listen(5000, () => 
        console.log("Connected to database and server is running.")
    )
}).catch((e) => console.log(e));