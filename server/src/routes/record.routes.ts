import express from "express";
import { createRecord, getRecords } from "../controllers/record.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getRecords);
router.post("/", createRecord);

export default router;
