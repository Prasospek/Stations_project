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

// TODO
/* PREVIOUS STOP NEXT STOP ? */ 

const Station = mongoose.model("Station", StationSchema);
export default Station;
