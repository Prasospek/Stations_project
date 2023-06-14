import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isValidObjectId } from "mongoose";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" });

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

        // FOR RETRIEVING OBJECT ID -> POPULATE!!
        const foundUser = await User.findById(id).populate("tickets");

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

    // Validation for firstName, lastName, password, and email
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
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const updatedRole = req.body.role || user.role;

        const updateFields = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            role: updatedRole,
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            updateFields.password = passwordHash;
        }

        if (tickets) {
            // Replace existing tickets with new ones
            updateFields.tickets = tickets;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
            new: true,
        });

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

        // Find the user and retrieve their ticket IDs
        const foundUser = await User.findById(id).populate("tickets");
        if (!foundUser) {
            return res.status(404).json({ error: "User not found!" });
        }

        const ticketIds = foundUser.tickets.map((ticket) => ticket._id);

        // Delete the user and their associated tickets
        await Promise.all([
            User.findByIdAndDelete(id), // Delete the user
            Ticket.deleteMany({ _id: { $in: ticketIds } }), // Delete the associated tickets
        ]);

        res.status(200).json({
            message: "User and associated tickets deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
