import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";

export const noteRoutes = Router();

const noteController = new NotesController();

noteRoutes.get("/", noteController.index);
noteRoutes.post("/:user_id", noteController.create);
noteRoutes.get("/:id", noteController.show);
noteRoutes.delete("/:id", noteController.delete);
