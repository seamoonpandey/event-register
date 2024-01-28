import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    beginningDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    coordinator: {
        type: String,
        required: true
    },
    subcoordinator: {
        type: String
    },
    venue: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Event=mongoose.model("Event", eventSchema);

export default Event;