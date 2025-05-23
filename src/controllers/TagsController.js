import { connection } from "../database/knex/index.js";

export class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await connection("tags").where({ user_id }).groupBy("name");

    return response.json(tags);
  }
}
