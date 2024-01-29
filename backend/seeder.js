// seeder.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import events from "./data/events.js";
import Event from "./models/event.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    await Event.deleteMany();

    const createdEvents = await Event.insertMany(events);

    console.log(`${createdEvents.length} Events Seeded`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    await Event.deleteMany();

    console.log("Data Cleared!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-c") {
  clearData();
} else {
  seedData();
}
