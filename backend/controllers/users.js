import User from "../models/User";

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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
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

        res.status(204).json(foundUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
