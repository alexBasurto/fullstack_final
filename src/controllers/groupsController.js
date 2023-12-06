//groupsController.js
import e from 'express';
import groupModel from '../models/groupsModel.js';

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupModel.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getGroupById = async (req, res) => {
    try {
        const group = await groupModel.findById(req.params.id);
        res.status(200).json(group);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createGroup = async (req, res) => {
    const group = req.body;
    const newGroup = new groupModel(group);
    try {
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateGroup = async (req, res) => {
    const group = await groupModel.findById(req.params.id);
    const { name, description, users } = req.body;
    if (name) group.name = name;
    if (description) group.description = description;
    if (users) group.users = users;
    group.updatedAt = new Date();
    try {
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteGroup = async (req, res) => {
    try {
        const group = await groupModel.findByIdAndDelete(req.params.id);
        res.status(200).json(group);
    }   catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup };
