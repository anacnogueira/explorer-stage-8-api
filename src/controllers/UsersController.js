import { hash } from "bcryptjs";
import { AppError } from "../utils/AppError.js";
import { sqlConnection } from "../database/sqlite/index.js";
export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqlConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("This email is already in use");
    }

    const hashedPassword = await hash(password, 8);
    await database.run(
      "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json({});
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqlConnection();
    const user = await database.get("SELECT * from users WHERE id = (?)", [id]);

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

    user.name = name;
    user.email = email;

    await database.run(
      `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, user.password, new Date(), id]
    );

    return response.status(200).json({});
  }
}
