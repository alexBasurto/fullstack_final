//usersController.js
import userModel from "../models/usersModel.js";

import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-passwordHash");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        if (req.params.id === 'me') {
            const user = await userModel.findById(req.userId).select("-passwordHash");
            res.status(200).json(user);
        } else {
            const user = await userModel.findById(req.params.id).select("-passwordHash");
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = new userModel(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let userId;
        if (req.params.id === 'me') {
            userId = req.userId;
        } else {
            userId = req.params.id;
        }
        if (req.body.password) {
            
            if (req.body.password !== req.body.passwordVerify) {
                return res.status(400).json({ errorMessage: "Please enter the same password twice." });
            } else if (req.body.password.length < 8) {
                return res.status(400).json({ errorMessage: "Please enter a password of at least 8 characters." });
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            req.body.password = passwordHash;
        }

        const user = await userModel.findById(userId);
        const { username, email, mobile, password, role, active } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;
        if (password) user.password = password;
        if (role) user.role = role;
        if (active) user.active = active;
        user.updatedAt = new Date();
        await user.save();
        res.status(200).json(user);
    }   catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };

