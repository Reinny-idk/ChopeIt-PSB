import mongoose from "mongoose";

const notiSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
        enum: ["chope_created", "chope_deleted", "chope_remind"],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
    seat:{
        type: mongoose.Types.ObjectId, 
        ref: "Seat"
    },
    date: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Notification", notiSchema);