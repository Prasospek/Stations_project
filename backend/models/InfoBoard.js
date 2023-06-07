import mongoose from "mongoose";

const infoBoardSchema = new mongoose.Schema(
    {
        station_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Station",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const InfoBoard = mongoose.model("InfoBoard", infoBoardSchema);

export default InfoBoard;
