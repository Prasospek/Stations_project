import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

export const getTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found !" });
        }
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTicket = async (req, res) => {
    try {
        const { station_id, purchase_method, destination_id } = req.body;

        const passenger_id = req.user._id;

        if (!passenger_id) {
            return res.status(400).json({ message: "Couldn't find user!" });
        }

        const stations = {
            Station1: "6485f933e63353dd9f5c4a85",
            Station2: "6485f944e63353dd9f5c4a87",
            Station3: "6485f948e63353dd9f5c4a89",
            Station4: "6485f94ce63353dd9f5c4a8b",
            Station5: "6485f94fe63353dd9f5c4a8d",
            Station6: "6485f951e63353dd9f5c4a8f",
            Station7: "6485f956e63353dd9f5c4a91",
        };

        const stationId = stations[station_id];
        const destinationId = stations[destination_id];

        if (!stationId) {
            return res.status(400).json({ message: "Invalid Starter Station" });
        }

        if (!destinationId) {
            return res
                .status(400)
                .json({ message: "Invalid Destination Station" });
        }

        const newTicket = new Ticket({
            passenger_id,
            station_id: stationId,
            purchase_method,
            destination_id: destinationId,
            purchase_date: Date.now(),
        });

        await newTicket.save();

        // Update the user's tickets array with the new ticket's ID
        const user = await User.findOneAndUpdate(
            { _id: passenger_id },
            { $push: { tickets: newTicket._id } }
        );

        res.status(201).json(newTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { passenger_id, station_id, purchase_method, destination_id } =
            req.body;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            {
                passenger_id,
                station_id,
                purchase_method,
                destination_id,
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found !" });
        }

        res.status(200).json({
            message: "Ticket updated successfully",
            updatedTicket,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({ error: "Ticket not found !" });
        }

        // Remove the reference to the deleted ticket from the user's tickets array
        const user = await User.findOneAndUpdate(
            { tickets: id },
            { $pull: { tickets: id } }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(204).json(deletedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
