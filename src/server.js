import "dotenv/config";
import { migrationsRun } from "./database/sqlite/migrations/index.js";
import { AppError } from "./utils/AppError.js";
import express, { response } from "express";
import { routes } from "./routes/index.js";
import uploadConfig from "./configs/upload.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

migrationsRun();

app.use(routes);

const PORT = process.env.PORT || 3333;

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
