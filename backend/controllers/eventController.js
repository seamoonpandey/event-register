import asyncHandler from "../middleware/asyncHandler.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import Event from "../models/event.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join("uploads");
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => {
        cb(null, uploadDir);
      })
      .catch((err) => {
        cb(err, null);
      });
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

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
  upload.single("titleImage");
  const {
    title,
    beginningDate,
    endingDate,
    description,
    coordinator,
    subcoordinator,
    venue,
  } = req.body;

  console.log(req.file);

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
