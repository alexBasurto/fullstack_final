import { Router } from "express";
import usersRouter from "./usersRouter.js";
import groupsRouter from "./groupsRouter.js";
import authRouter from "./authRouter.js";

const router= Router();

router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/", authRouter);

export default router;