import { AppError } from "../utils/AppError.js";
export class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new AppError("name is required");
    }
    response.status(201).json({ name, email, password });
  }
}
