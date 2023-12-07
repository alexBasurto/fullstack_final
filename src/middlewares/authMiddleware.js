import jwt from 'jsonwebtoken';

import userModel from '../models/usersModel.js';

const checkLoggedIn = (req, res, next) => {
    try {
        console.log('CHECK LOGIN', req.headers?.cookie);
        if (!req.headers?.cookie) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        else if (req.headers?.cookie) {
            const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
                const [name, value] = cookie.trim().split('=');
                cookiesObject[name] = value;
                return cookiesObject;
            }, {});
        const token = cookies.token;
        console.log('TOKEN', token);
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized1" });
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const check = await loggedIn(req, res);
        if (check) {
            const user = await userModel.findById(req.user);
            if (user.role === "admin") {
                next();
            } else {
                res.status(401).json({ errorMessage: "Unauthorized" });
            }
        }
    } catch (error) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

export { checkLoggedIn, checkAdmin };