import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export async function sqlConnection() {
  const database = await open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}
