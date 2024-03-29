import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { notFound, errorHandler } from "./middleware/errorHandler.js";

import connectDb from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running..... I think so!!!!");
});

app.use("/api/events", eventRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
