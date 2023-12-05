//usersRouter.js
import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", (req, res) => usersController.getAllUsers(req, res));
usersRouter.get("/:id", (req, res) => usersController.getUserById(req, res));
usersRouter.post("/new", (req, res) => usersController.createUser(req, res));
usersRouter.put("/:id/edit", (req, res) => usersController.updateUser(req, res));
usersRouter.delete("/:id", (req, res) => usersController.deleteUser(req, res));


export default usersRouter;
