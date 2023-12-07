import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const register = async (req, res) => {
    const { username, email, mobile, password, passwordVerify } = req.body;

    // Validation
    if (!username || !email || !mobile || !password || !passwordVerify) {
        return res.status(400).json({ errorMessage: "Please enter all required fields." });
    }

    if (password.length < 8) {
        return res.status(400).json({ errorMessage: "Please enter a password of at least 8 characters." });
    }

    if (password !== passwordVerify) {
        return res.status(400).json({ errorMessage: "Please enter the same password twice." });
    }

    // Check if the username or email already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errorMessage: "An account with this email already exists." });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ errorMessage: "This username is already taken." });
        }

        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ errorMessage: "An account with this mobile already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save a new user account to the db
        const newUser = new User({
            username,
            email,
            mobile,
            passwordHash
        });

        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ errorMessage: "Please enter all required fields." });
    }

    try {
        // Check if the username exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        }

        // Check if the password is correct
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        }

        // Sign the token
        const token = jwt.sign({
            user: existingUser._id,
            expiresIn: '1h'
        }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        }
        ).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
}

export default {
    register,
    login,
    logout
}
