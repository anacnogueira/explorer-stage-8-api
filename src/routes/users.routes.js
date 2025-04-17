import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";

export const userRoutes = Router();

function myMiddleware(request, response, next) {
  console.log("you passed the middleware");
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }
  next();
}

const userController = new UsersController();
userRoutes.use(myMiddleware);

userRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

userRoutes.post("/", userController.create);
