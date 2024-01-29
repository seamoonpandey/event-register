import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Participant",
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ event: 1, participant: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
