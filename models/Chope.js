import mongoose from "mongoose";

const chopeSchema = new mongoose.Schema({
    seat: {
        type: mongoose.Types.ObjectId,
        ref: "Seat",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
});

export default mongoose.model("Chope", chopeSchema);
