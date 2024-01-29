import express from "express";

import {
  postAttendance,
  getAttendanceSheet,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.route("/").post(postAttendance).get(getAttendanceSheet);

export default router;
