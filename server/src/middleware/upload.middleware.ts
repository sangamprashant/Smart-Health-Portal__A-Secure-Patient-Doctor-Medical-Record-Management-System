import fs from "fs";
import path from "path";
import multer from "multer";

const uploadsRoot = path.join(process.cwd(), "uploads");
const recordsDir = path.join(uploadsRoot, "records");

for (const dir of [uploadsRoot, recordsDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, recordsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 50);

    cb(null, `${Date.now()}-${baseName || "record"}${ext}`);
  },
});

export const uploadRecord = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
