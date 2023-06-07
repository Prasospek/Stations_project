import mongoose from "mongoose";

// Definice schématu
const issueSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
    description: { type: String, required: true },
    reported_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",
        required: true,
    },
    reported_date: { type: Date, default: Date.now },
});

// Vytvoření modelu
const Issue = mongoose.model("Issue", issueSchema);

// Export modelu
export default Issue;
