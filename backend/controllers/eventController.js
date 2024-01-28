import asyncHandler from '../middleware/asyncHandler.js';
import Event from '../models/event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public

const getEvents=asyncHandler(async (req, res) => {
    const events=await Event.aggregate([
        {
            $match: {
                date: { $exists: true }
            }
        },
        {
            $sort: {
                date: -1
            }
        }
    ]);

    res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public

const getEventById=asyncHandler(async (req, res) => {
    const event=await Event.findById(req.params.id);

    if (event) {
        res.json(event);
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

export { getEvents, getEventById };