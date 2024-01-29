import express from "express";
import {
  getEvents,
  getEventById,
  postNewEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(getEvents).post(postNewEvent);
router.route("/:id").get(getEventById).delete(deleteEvent);

export default router;
