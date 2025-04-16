import express from "express";

const app = express();

app.get("/message/:user/:id", (request, response) => {
  const { user, id } = request.params;
  response.send(`User: ${user}, Message id: ${id}`);
});

app.get("/users", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Page: ${page}, Show: ${limit} registers`);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
