import { connection } from "../database/knex/index.js";

export class NotesController {
  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await connection("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("title");
    } else {
      notes = await connection("notes")
        .where({
          user_id,
        })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await connection("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id == note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

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
