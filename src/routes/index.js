import { Router } from "express";
import { userRoutes } from "./users.routes.js";

export const routes = Router();

routes.use("/users", userRoutes);
