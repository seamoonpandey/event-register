import express from 'express';
import { getEvents, getEventById } from '../controllers/eventController';

const router=express.Router();

router.route('/').get(getEvents);
router.route('/:id').get(getEventById);

export default router;