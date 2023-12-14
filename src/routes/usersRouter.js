//usersRouter.js
import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { checkLoggedIn, checkAdmin } from "../middlewares/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/", checkLoggedIn, (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/:id", checkLoggedIn, (req, res) => usersController.getUserById(req, res));
usersRouter.post("/new", checkLoggedIn, (req, res) => usersController.createUser(req, res));
usersRouter.put("/:id/edit", checkLoggedIn, (req, res) => usersController.updateUser(req, res));
usersRouter.delete("/:id", checkLoggedIn, (req, res) => usersController.deleteUser(req, res));


export default usersRouter;
