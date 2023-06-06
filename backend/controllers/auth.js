import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Validate email and password using regex
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        /* EMAIL REGEX CHECK */
        if (!email.match(emailRegex)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        /* PASSWORD REGEX CHECK */
        if (!password.match(passwordRegex)) {
            return res.status(400).json({ error: "Invalid password format" });
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
        res.status(201).json(`New user successfully created ! \n ${savedUser}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password using regex
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        /* EMAIL REGEX CHECK */
        if (!email.match(emailRegex)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        /* PASSWORD REGEX CHECK */
        if (!password.match(passwordRegex)) {
            return res.status(400).json({ error: "Invalid password format" });
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
        res.status(200).json(`Successfully logged in ! \n ${token} ${user}`);
    } catch (err) {}
};
