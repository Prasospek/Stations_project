import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = await User.findById(id);

        if (!foundUser) {
            return res.status(404).json({ error: "User not found !" });
        }

        res.status(200).json(foundUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsersTickets = async (req, res) => {
    try {
        const { id } = req.params;

        const foundUser = await User.findById(id);

        if (!foundUser) {
            return res.status(404).json({ error: "User not found !" });
        }

        res.status(200).json(foundUser.tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    const { firstName, lastName, email, password, tickets } = req.body;
    const { id } = req.params;

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const secureRegex = /^[a-zA-Z0-9$./]+$/;
    const salt = await bcrypt.genSalt(10);

    if (
        firstName &&
        lastName &&
        password &&
        email &&
        (!firstName.match(secureRegex) ||
            !lastName.match(secureRegex) ||
            !password.match(secureRegex) ||
            !email.match(emailRegex))
    ) {
        return res
            .status(400)
            .json({ error: "Invalid format, only usable a-Z 0-9" });
    }

    try {
        // Spread so I can only update the field i want and not the Whole object!
        const updateFields = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            role: "user",
            tickets,
        };

        // Adding password later one in case Admin wanted to change it
        // This is because of bcrypt and its hash otherwise it was throwing
        // data and salt required error !

        if (password) {
            const passwordHash = await bcrypt.hash(password, salt);
            updateFields.password = passwordHash;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,

            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = await User.findByIdAndDelete(id);

        if (!foundUser) {
            return res.status(404).json({ error: "User not found !" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
