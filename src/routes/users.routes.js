import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const userRoutes = Router();

const userController = new UsersController();

userRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
