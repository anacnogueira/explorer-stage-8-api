import express from "express";

const app = express();
app.use(express.json());

app.get("/message/:user/:id", (request, response) => {
  const { user, id } = request.params;
  response.send(`User: ${user}, Message id: ${id}`);
});

app.get("/users", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

app.post("/users", (request, response) => {
  const { name, email, password } = request.body;
  response.json({ name, email, password });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
