import mongoose from "mongoose";

const participantSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        college: {
            type: String,
            required: true
        },
        faculty: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            unique: true,
            match: /^[0-9]{10}$/i,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Event"
        }

    },
    {
        timestamps: true
    }
);

const Participant=mongoose.model("Participant", participantSchema);

export default Participant;