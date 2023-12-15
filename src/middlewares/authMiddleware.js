import jwt from 'jsonwebtoken';

import userModel from '../models/usersModel.js';

const checkLoggedIn = (req, res, next) => {
    try {
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
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
        const dataUser = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = dataUser.userId;
        req.userEmail = dataUser.userEmail;
        next();
    }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const cookies = req.headers?.cookie.split(';').reduce((cookiesObject, cookie) => {
            const [name, value] = cookie.trim().split('=');
            cookiesObject[name] = value;
            return cookiesObject;
        }, {});
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.user);
        if (user.role === 'admin') {
            next();
        } else {
            res.status(401).json({ errorMessage: "Unauthorized" });
        }
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

export { checkLoggedIn, checkAdmin };