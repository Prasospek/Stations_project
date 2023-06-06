import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        role: {
            type: String,
            enum: ["admin", "technician", "user"],
            default: "user",
        },
        tickets: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

// Cestující si mohou zakoupit jízdenky na stanici přes pracovníka nebo sami online.

const User = mongoose.model("User", UserSchema);
export default User;
