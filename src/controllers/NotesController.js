import { connection } from "../database/knex/index.js";

export class NotesController {
  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await connection("tags").whereIn("name", filterTags);
    } else {
      notes = await connection("notes")
        .where({
          user_id,
        })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    return response.json(notes);
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const [note_id] = await connection("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await connection("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await connection("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await connection("notes").where({ id }).first();
    const tags = await connection("tags")
      .where({ note_id: id })
      .orderBy("name");
    const links = await connection("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await connection("notes").where({ id }).delete();

    return response.json();
  }
}
