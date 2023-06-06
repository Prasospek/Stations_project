import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
    {
        stationName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
    },
    { timestamps: true }
);

const Station = mongoose.model("Station", StationSchema);
export default Station;
