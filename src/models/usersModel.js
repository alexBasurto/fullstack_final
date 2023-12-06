import mongoose from "mongoose";
import mongodb from "../config/mongo.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        min: 9,
        max: 9,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
        min: 8,
        max: 150,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;