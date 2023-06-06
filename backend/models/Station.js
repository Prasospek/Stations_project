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
// Systém obsahuje více stanic na povrchu a v podzemí planety.

// Každá stanice má své označení a spojení s ostatními stanicemi.

/* PREVIOUS STOP NEXT STOP ? */

const Station = mongoose.model("Station", StationSchema);
export default Station;
