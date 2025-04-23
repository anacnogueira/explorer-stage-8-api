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
}
