import asyncHandler from "../middleware/asyncHandler.js";
import Participant from "../models/participant.js";
import Event from "../models/event.js";

// @desc    Get all participants
// @route   GET /api/participants
// @access  Private/Admin
const getParticipants = asyncHandler(async (_req, res) => {
  const participants = await Participant.find({
    event: _req.query.eventId,
  }).sort({
    createdAt: -1,
  });
  res.json(participants);
});

// @desc    Get participant by ID
// @route   GET /api/participants/:id
// @access  Private/Admin
const getParticipantById = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (participant) {
    res.json(participant);
  } else {
    res.status(404);
    throw new Error("Participant not found");
  }
});

// @desc    Post new participant
// @route   POST /api/participants
// @access  Public
const createParticipant = asyncHandler(async (req, res) => {
  var data = req.body;
  data.event = await Event.findOne({ _id: data.event });
  const participant = await Participant.create(data);

  if (participant) {
    res.status(201).json(participant);
  } else {
    res.status(400);
    throw new Error("Invalid participant data");
  }
});

export { getParticipants, getParticipantById, createParticipant };
