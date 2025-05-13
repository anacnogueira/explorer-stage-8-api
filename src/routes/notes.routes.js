import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const noteRoutes = Router();

const noteController = new NotesController();

noteRoutes.use(ensureAuthenticated);

noteRoutes.get("/", noteController.index);
noteRoutes.post("/", noteController.create);
noteRoutes.get("/:id", noteController.show);
noteRoutes.delete("/:id", noteController.delete);
