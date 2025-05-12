import { compare } from "bcryptjs";
import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
export class SessionsController {
  async create(request, response) {
    const invalidMessage = "Email e/or password invalid.";
    const { email, password } = request.body;

    const user = await connection("users").where({ email }).first();

    if (!user) {
      throw new AppError(invalidMessage, 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(invalidMessage, 401);
    }

    return response.json(user);
  }
}
