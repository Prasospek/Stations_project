import Issue from "../models/Issue.js";

export const getIssue = async (req, res) => {
    try {
        const { id } = req.params;

        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found !" });
        }

        res.status(200).json(issue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getIssues = async (req, res) => {
    try {
        const issue = await Issue.find();

        res.status(200).json(issue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createIssue = async (req, res) => {
    try {
        const {station_id, description, reported_by} = req.body;

        const newIssue = new Issue({
            station_id,
            description,
            reported_by,
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateIssue = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteIssue = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
