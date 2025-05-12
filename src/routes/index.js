import { Router } from "express";
import { userRoutes } from "./users.routes.js";
import { sessionRoutes } from "./sessions.routes.js";
import { noteRoutes } from "./notes.routes.js";
import { tagRoutes } from "./tags.routes.js";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/notes", noteRoutes);
routes.use("/tags", tagRoutes);
