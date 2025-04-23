import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";

export const userRoutes = Router();

const userController = new UsersController();

userRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);
