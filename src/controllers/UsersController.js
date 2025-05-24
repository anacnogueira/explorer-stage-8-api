import { hash, compare } from "bcryptjs";
import { AppError } from "../utils/AppError.js";
import { sqlConnection } from "../database/sqlite/index.js";
import { UserRepository } from "../repositories/UserRepository.js";
export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();

    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("This email is already in use");
    }

    const hashedPassword = await hash(password, 8);
    await userRepository.create(name, email, hashedPassword);

    return response.status(201).json({});
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqlConnection();
    const user = await database.get("SELECT * from users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("This email is already in use.");
    }

    if (password && !old_password) {
      throw new AppError(
        "You need to enter the old password to set the new password."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("The old password does not match.");
      }

      user.password = await hash(password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await database.run(
      `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('NOW')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json({});
  }
}
