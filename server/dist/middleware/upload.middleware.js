"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRecord = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uploadsRoot = path_1.default.join(process.cwd(), "uploads");
const recordsDir = path_1.default.join(uploadsRoot, "records");
for (const dir of [uploadsRoot, recordsDir]) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, recordsDir);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const baseName = path_1.default
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .slice(0, 50);
        cb(null, `${Date.now()}-${baseName || "record"}${ext}`);
    },
});
exports.uploadRecord = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
