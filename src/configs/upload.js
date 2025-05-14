import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

export default {
  TMP_FOLDER,
  UPLOAD_FOLDER: path.resolve(TMP_FOLDER, "uploads"),
  MULTER: {
    storage: multer.diskStorage({
      destination: TMP_FOLDER,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
};
