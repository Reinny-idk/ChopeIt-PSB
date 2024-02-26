import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        User: {
            type: Number,
            default: 2024,
        },
        Admin: Number,
    },
    chopes:[{
        type: mongoose.Types.ObjectId, 
        ref: "Chope"
    }],
    refreshToken: String,
});

export default mongoose.model("User", userSchema);