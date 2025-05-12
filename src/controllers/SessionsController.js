import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await connection("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email e/or password invalid.", 401);
    }
    return response.json(user);
  }
}
