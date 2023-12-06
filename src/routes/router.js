//router.js
import { Router } from "express";
import usersRouter from "./usersRouter.js";
import groupsRouter from "./groupsRouter.js";

const router= Router();

router.use("/users", usersRouter);
router.use("/groups", groupsRouter);


export default router;