import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import multer from "multer";
import uploadConfig from "../configs/upload.js";

export const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();

userRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);
