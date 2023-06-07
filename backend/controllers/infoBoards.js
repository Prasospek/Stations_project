import InfoBoard from "../models/InfoBoard.js";

export const getInfoBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const infoBoard = await InfoBoard.findById(id);

        if (!infoBoard) {
            return res.status(404).json({ error: "InfoBoard not found !" });
        }

        res.status(200).json(infoBoard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getInfoBoards = async (req, res) => {
    try {
        const infoBoard = await InfoBoard.find();

        res.status(200).json(infoBoard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createInfoBoard = async (req, res) => {
    try {
        const { station_id, content } = req.body;

        const newInfoBoard = new InfoBoard({
            station_id,
            content,
        });

        res.status(201).json(newInfoBoard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateInfoBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const { station_id, content } = req.body;

        const updatedInfoBoard = await InfoBoard.findByIdAndUpdate(
            id,
            {
                station_id,
                content,
            },
            { new: true }
        );

        if (!updatedInfoBoard) {
            return res.status(404).json({ error: "InfoBoard not found !" });
        }

        res.status(204).json(updatedInfoBoard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteInfoBoard = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedInfoBoard = await InfoBoard.findByIdAndDelete(id);

        if (!deletedInfoBoard) {
            return res.status(404).json({ error: "InfoBoard not found !" });
        }

        res.status(204).json(deletedInfoBoard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
