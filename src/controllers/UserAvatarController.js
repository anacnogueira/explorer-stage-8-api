import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { DiskStorage } from "../providers/DiskStorage.js";

export class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const user = await connection("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    const diskStorage = new DiskStorage();
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await connection("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}
