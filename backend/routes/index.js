import express from "express";
import authRouter from "./auth.js";
import workspaceRouter from "./workspace.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/workspaces", workspaceRouter);

export default router;
