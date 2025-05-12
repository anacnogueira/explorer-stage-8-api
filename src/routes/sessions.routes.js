import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController.js";

export const sessionRoutes = Router();

const sessionsController = new SessionsController();

sessionRoutes.post("/", sessionsController.create);
