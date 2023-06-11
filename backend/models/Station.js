import mongoose from "mongoose";

// Definice schématu
const stationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surface: {
            type: String,
            enum: ["ground", "underground"],
            required: true,
        },
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Station",
            },
        ],
        info_board_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InfoBoard",
        },
    },
    { timestamps: true }
);

// Vytvoření modelu
const Station = mongoose.model("Station", stationSchema);

// Export modelu
export default Station;
