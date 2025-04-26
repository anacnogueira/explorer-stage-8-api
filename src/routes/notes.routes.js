import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";

export const noteRoutes = Router();

const noteController = new NotesController();

noteRoutes.post("/:user_id", noteController.create);
