//groupsController.js
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


const getMyGroups = async (req, res) => {  
    try {
        const groups = await groupModel.find({ $and: [{users: req.userEmail}, {active: true}] });
        res.status(200).json(groups);
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
    try {
        const group = await groupModel.findById(req.params.id);
        const { name, description, users } = req.body;
        console.log('\x1b[41m%s\x1b[0m', group);
        if (name) group.name = name;
        if (description) group.description = description;
        if (users) group.users = users;
        group.updatedAt = new Date();
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const desactiveGroup = async (req, res) => {
    try {
        const group = await groupModel.findById(req.params.id);
        group.active = false;
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

//transaction en backend
const createTransaction = async (req, res) => {
    try {
        const group = await groupModel.findById(req.params.id);
        console.log("GRUPO AQUI", group.users)
        const { amount, description, date, hour, user, beneficiaryAndRepartition } = req.body;
        const transaction = {
            amount: amount,
            description: description,
            date: date,
            hour: Date.now(),
            user: user,
            beneficiaryAndRepartition: beneficiaryAndRepartition || group.users.map(user => ({email: user, amount: amount/group.users.length}))
        }
        console.log("TRANSACTION AQUI", transaction)
        group.transactions.push(transaction);
        await group.save();
        console.log("GRUPO Guardado AQUI", group)
        res.status(200).json(group);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateTransaction = async (req, res) => {
    try {
        const group = await groupModel.findById(req.params.id);
        const transaction = group.transactions.id(req.params.idTransaction);
        const { amount, description, date, hour, user, beneficiaryAndRepartition } = req.body;
        if (amount) transaction.amount = amount;
        if (description) transaction.description = description;
        if (date) transaction.date = date;
        if (hour) transaction.hour = hour;
        if (user) transaction.user = user;
        if (beneficiaryAndRepartition) transaction.beneficiaryAndRepartition = beneficiaryAndRepartition;
        await group.save();
        res.status(200).json(group);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default { 
    getAllGroups, 
    getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup, 
    getMyGroups, 
    desactiveGroup,
    createTransaction,
    updateTransaction
};
