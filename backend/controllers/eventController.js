import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/event.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    $or: [
      { beginningDate: { $gte: new Date() } },
      { beginningDate: { $lt: new Date() } },
    ],
  }).sort({
    beginningDate: 1,
  });

  res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Post new event with image upload
// @route   POST /api/events
// @access  Private/Admin
const postNewEvent = asyncHandler(async (req, res) => {
  const {
    title,
    beginningDate,
    endingDate,
    description,
    coordinator,
    subcoordinator,
    venue,
  } = req.body;

  const event = await Event.create({
    title,
    titleImage: req.file ? req.file.path : undefined,
    beginningDate,
    endingDate,
    description,
    coordinator,
    subcoordinator,
    venue,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin

const deleteEvent = asyncHandler(async (req, res) => {
  if (await Event.deleteOne({ _id: req.params.id })) {
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

export { getEvents, getEventById, postNewEvent, deleteEvent };
