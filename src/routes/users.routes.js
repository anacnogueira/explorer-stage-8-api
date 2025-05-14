import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { UserAvatarController } from "../controllers/UserAvatarController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import multer from "multer";
import uploadConfig from "../configs/upload.js";

export const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

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
  userAvatarController.update
);
