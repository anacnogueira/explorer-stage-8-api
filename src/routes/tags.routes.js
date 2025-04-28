import { Router } from "express";
import { TagsController } from "../controllers/TagsController.js";

export const tagRoutes = Router();

const tagController = new TagsController();

tagRoutes.get("/:user_id", tagController.index);
