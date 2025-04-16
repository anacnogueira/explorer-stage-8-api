import express from "express";

const app = express();

app.get("/message/:user/:id", (request, response) => {
  const { user, id } = request.params;
  response.send(`User: ${user}, Message id: ${id}`);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
