import express from "express";
import {
  getParticipants,
  getParticipantById,
  createParticipant,
} from "../controllers/participantController.js";

const router = express.Router();

router.route("/").get(getParticipants).post(createParticipant);
router.route("/:id").get(getParticipantById);

export default router;
