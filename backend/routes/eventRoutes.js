import express from "express";
import {
  getEvents,
  getEventById,
  postNewEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(getEvents);
router.route("/:id").get(getEventById);
router.route("/").post(postNewEvent);

export default router;
