import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

userRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;
  response.json({ name, email, password });
});
