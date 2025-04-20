import { AppError } from "./utils/AppError.js";
import express, { response } from "express";
import { routes } from "./routes/index.js";
import { sqlConnection as database } from "./database/sqlite/index.js";

const app = express();
app.use(express.json());

app.use(routes);
database();

const PORT = 3000;

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
