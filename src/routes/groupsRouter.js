//groupsRouter.js
import e, { Router } from "express";
import groupsController from "../controllers/groupsController.js";
import { checkLoggedIn } from "../middlewares/authMiddleware.js";

const groupsRouter = Router();

groupsRouter.get("/", (req, res) => groupsController.getAllGroups(req, res));
groupsRouter.get("/my-groups", checkLoggedIn,(req, res) => groupsController.getAllGroups(req, res));
groupsRouter.get("/:id", (req, res) => groupsController.getGroupById(req, res));
groupsRouter.post("/new", (req, res) => groupsController.createGroup(req, res));
groupsRouter.put("/:id/edit", (req, res) => groupsController.updateGroup(req, res));
groupsRouter.delete("/:id", (req, res) => groupsController.deleteGroup(req, res));

export default groupsRouter;