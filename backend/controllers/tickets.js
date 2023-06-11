import Ticket from "../models/Ticket.js";

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
            return res
                .status(400)
                .json({ message: "Couldnt find user! createTicket function " });
        }

        const newTicket = new Ticket({
            passenger_id: passenger_id,
            station_id,
            purchase_method,
            destination_id,
        });

        await newTicket.save();

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

        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({ error: "User not found !" });
        }

        res.status(204).json(deletedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
