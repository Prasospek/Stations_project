import Station from "../models/Station.js";

export const getStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findById(id);

        if (!station) {
            return res.status(404).json({ error: "Station not found !" });
        }

        res.status(200).json(station);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getStations = async (req, res) => {
    try {
        const stations = await Station.find();

        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createStation = async (req, res) => {
    try {
        const { name, surface, connections, info_board_id } = req.body;
        const newStation = new Station({
            name,
            surface,
            connections,
            info_board_id,
        });

        await newStation.save();

        res.status(201).json(newStation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surface, connections, info_board_id } = req.body;

        const updatedStation = await Station.findByIdAndUpdate(id, {
            name,
            surface,
            connections,
            info_board_id,
        });

        if (!updatedStation) {
            return res.status(404).json({ error: "Station not found !" });
        }

        res.status(200).json(updatedStation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteStation = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStation = await Station.findByIdAndDelete(id);

        if (!deletedStation) {
            return res.status(404).json({ error: "Station not found !" });
        }

        res.status(204).json(deletedStation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
