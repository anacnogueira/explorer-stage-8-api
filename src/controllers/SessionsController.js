import { compare } from "bcryptjs";
import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import authConfig from "../configs/auth.js";
import pkg from "jsonwebtoken";
export class SessionsController {
  async create(request, response) {
    const { sign } = pkg;
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

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}
