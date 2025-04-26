import { Router } from "express";
import { userRoutes } from "./users.routes.js";
import { noteRoutes } from "./notes.routes.js";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/notes", noteRoutes);
