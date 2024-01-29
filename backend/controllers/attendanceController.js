import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/event.js";
import Participant from "../models/participant.js";
import Attendance from "../models/attendance.js";

// @desc Hajiri gara hai
// @route POST /api/attendance
// @access Public

const postAttendance = asyncHandler(async (req, res) => {
  const { event, email } = req.body;
  const participant = await Participant.findOne({ email, event });
  if (!participant) {
    res.status(404);
    throw new Error("Participant not found");
  }
  const attendance = await Attendance.create({
    event,
    participant: participant._id,
  });
  if (attendance) {
    res.status(201).json(attendance);
  } else {
    res.status(400);
    throw new Error("Invalid attendance data");
  }
});

// @desc Get attendance sheet
// @route GET /api/attendance
// @access Private

const getAttendanceSheet = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const attendanceSheet = await Attendance.find({ eventId }).populate(
    "participant"
  );

  const participants = [];

  attendanceSheet.map((attendance) => {
    participants.push(attendance.participant);
  });

  if (attendanceSheet && participants) {
    res.status(200).json(participants);
  } else {
    res.status(400);
    throw new Error("Invalid attendance data");
  }
});

export { postAttendance, getAttendanceSheet };
