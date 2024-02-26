import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatID: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    chope: [{
        type: mongoose.Types.ObjectId,
        ref: "Chope",
        required: false,
    }],
});

export default mongoose.model("Seat", seatSchema);