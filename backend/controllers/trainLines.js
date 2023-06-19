import TrainLine from "../models/TrainLine.js";
import Station from "../models/Station.js";
import axios from "axios";

class Graph {
    constructor() {
        this.vertices = new Map();
    }

    addEdge(source, target, weight) {
        if (!this.vertices.has(source)) {
            this.vertices.set(source, []);
        }
        if (!this.vertices.has(target)) {
            this.vertices.set(target, []);
        }
        this.vertices.get(source).push({ target: target, weight: weight });
        this.vertices.get(target).push({ target: source, weight: weight });
    }

    shortestPath(source, target) {
        const distances = new Map();
        const previous = new Map();
        const queue = new PriorityQueue();

        this.vertices.forEach((_, vertex) => {
            if (vertex === source) {
                distances.set(vertex, 0);
                queue.enqueue(vertex, 0);
            } else {
                distances.set(vertex, Infinity);
                queue.enqueue(vertex, Infinity);
            }
            previous.set(vertex, null);
        });

        while (!queue.isEmpty()) {
            const current = queue.dequeue();
            if (current === target) {
                break;
            }

            if (distances.get(current) === Infinity) {
                continue;
            }

            const neighbors = this.vertices.get(current);
            for (const neighbor of neighbors) {
                const alternateDistance =
                    distances.get(current) + neighbor.weight;
                if (alternateDistance < distances.get(neighbor.target)) {
                    distances.set(neighbor.target, alternateDistance);
                    previous.set(neighbor.target, current);
                    queue.enqueue(neighbor.target, alternateDistance);
                }
            }
        }

        const path = [];
        let current = target;
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }

        return path;
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.elements.length; i++) {
            if (queueElement.priority < this.elements[i].priority) {
                this.elements.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.elements.push(queueElement);
        }
    }

    dequeue() {
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

export const findShortestPath = async (sourceStationId, targetStationId) => {
    try {
        const response = await axios.get("http://localhost:8001/trainlines");
        const trainLines = response.data;

        const stationMap = new Map();
        trainLines.forEach((line) => {
            const stations = line.stations;
            for (let i = 0; i < stations.length; i++) {
                const stationId = stations[i];
                if (!stationMap.has(stationId)) {
                    stationMap.set(stationId, { line: line.name, index: i });
                }
            }
        });

        const graph = new Graph();
        trainLines.forEach((line) => {
            const stations = line.stations;
            for (let i = 0; i < stations.length - 1; i++) {
                const sourceStationId = stations[i];
                const targetStationId = stations[i + 1];
                const weight =
                    line.status === "disruption" ? Infinity : line.time;
                graph.addEdge(sourceStationId, targetStationId, weight);
            }
        });

        const shortestPath = graph.shortestPath(
            sourceStationId,
            targetStationId
        );
        return shortestPath;
    } catch (error) {
        console.error("Error fetching trainLines:", error);
        return null;
    }
};

export const getTrainLine = async (req, res) => {
    try {
        const { id } = req.params;
        const trainLine = await TrainLine.findById(id);

        if (!trainLine) {
            return res.status(404).json({ error: "TrainLine not found !" });
        }

        res.status(200).json(trainLine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTrainLines = async (req, res) => {
    try {
        const trainLines = await TrainLine.find();

        res.status(200).json(trainLines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTrainLine = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stations, status, time, originalTime } = req.body;

        const updatedTrainLine = await TrainLine.findByIdAndUpdate(
            id,
            {
                name,
                stations,
                status,
                time,
                originalTime,
            },
            { new: true }
        );

        if (!updatedTrainLine) {
            return res.status(404).json({ error: "TrainLine not found !" });
        }

        res.status(200).json(updatedTrainLine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTrainLine = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTrainLine = await TrainLine.findByIdAndDelete(id);

        if (!deletedTrainLine) {
            return res.status(404).json({ error: "TrainLine not found !" });
        }

        res.status(204).json(deletedTrainLine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTrainLine = async (req, res) => {
    try {
        const { name, stations, status, time, originalTime } = req.body;

        if (!stations) {
            return res
                .status(400)
                .json({ message: "Couldnt find Station! stations function " });
        }
        const newTrainLine = new TrainLine({
            name,
            stations,
            status,
            time,
            originalTime,
        });

        // automatic pushes into the array of sstations
        // const station = await Station.findOneAndUpdate(
        //     { _id: passenger_id },
        //     { $push: { tickets: newTicket._id } }
        // );

        await newTrainLine.save();

        res.status(201).json(newTrainLine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
