import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
    description: { 
        type: String, 
        required: true 
    },
    reported_by: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const allowedRoles = ["admin", "technician"];
                return allowedRoles.includes(value.role);
            },
            message: "Invalid role for reported_by",
        },
    },
    reported_date: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true } );

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
