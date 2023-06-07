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
        const issues = await Issue.find();

        res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createIssue = async (req, res) => {
    try {
        const { station_id, description, reported_by } = req.body;

        const newIssue = new Issue({
            station_id,
            description,
            reported_by,
        });

        await newIssue.save();

        res.status(201).json(newIssue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { station_id, description, reported_by } = req.body;

        const updatedIssue = await Issue.findByIdAndUpdate(id, {
            station_id,
            description,
            reported_by,
        }, { new: true });

        if (!updatedIssue) {
            return res.status(404).json({ error: "Issue not found !" });
        }


        res.status(200).json(updatedIssue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIssue = await Issue.findByIdAndDelete(id);

        if (!deletedIssue) {
            return res.status(404).json({ error: "Issue not found !" });
        }

        res.status(204).json(deletedIssue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
