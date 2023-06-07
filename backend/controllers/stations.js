import Station from "../models/Station.js";

export const getStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findById(id);

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

        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStation = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteStation = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
