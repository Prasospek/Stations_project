import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Validate email, firstName, lastName, password
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const secureRegex = /^[a-zA-Z0-9]+$/;

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        /* REGEX CHECK */
        if (
            !firstName.match(secureRegex) ||
            !lastName.match(secureRegex) ||
            !password.match(secureRegex) ||
            !email.match(emailRegex)
        ) {
            return res
                .status(400)
                .json({ error: "Invalid format, only usable a-Z 0-9" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            role: "user",
            tickets: [],
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "New user successfully created!",
            savedUser,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        /* REGEX CHECK */
        if (!password.match(secureRegex) || !email.match(emailRegex)) {
            return res
                .status(400)
                .json({ error: "Invalid format, only usable a-Z 0-9" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist ! " });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials ! " });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({
            message: "User succesfully logged in !",
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
