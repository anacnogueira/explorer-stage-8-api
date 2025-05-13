import { Router } from "express";
import { TagsController } from "../controllers/TagsController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const tagRoutes = Router();

const tagController = new TagsController();

tagRoutes.get("/", ensureAuthenticated, tagController.index);
