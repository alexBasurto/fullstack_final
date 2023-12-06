import mongoose from "mongoose";
import mongodb from "../config/mongo.js";

const beneficiaryAndRepartitionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    beneficiaryAndRepartition: {
        type: [beneficiaryAndRepartitionSchema],
        required: true,
    },
});

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 150,
    },
    users: {
        type: Array,
        required: true,
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
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    owner: {
        type: String,
        required: true,
    },
    transactions: {
        type: [transactionSchema],
        required: false,
    },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
