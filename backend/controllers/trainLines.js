import TrainLine from "../models/TrainLine.js";
import Station from "../models/Station.js";

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
        this.vertices.get(source).push({ target, weight });
        this.vertices.get(target).push({ target: source, weight });
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
    const trainLines = [
        {
            _id: "648de90d92659667578bae77",
            name: "St1-St3",
            stations: ["6485f933e63353dd9f5c4a85", "6485f948e63353dd9f5c4a89"],
            status: "maintenance",
            time: 30,
            createdAt: "2023-06-17T17:10:37.110Z",
            updatedAt: "2023-06-18T17:27:48.833Z",
            __v: 0,
            originalTime: 10,
        },
        {
            _id: "648de97392659667578bae7b",
            name: "St4-St2",
            stations: ["6485f94ce63353dd9f5c4a8b", "6485f944e63353dd9f5c4a87"],
            status: "maintenance",
            time: 27,
            createdAt: "2023-06-17T17:12:19.249Z",
            updatedAt: "2023-06-18T14:14:47.209Z",
            __v: 0,
            originalTime: 2,
        },
        {
            _id: "648de99892659667578bae7d",
            name: "St2-St5",
            stations: ["6485f944e63353dd9f5c4a87", "6485f94fe63353dd9f5c4a8d"],
            status: "operational",
            time: 7,
            createdAt: "2023-06-17T17:12:56.614Z",
            updatedAt: "2023-06-18T13:42:56.713Z",
            __v: 0,
            originalTime: 7,
        },
        {
            _id: "648de9be92659667578bae7f",
            name: "St5-St6",
            stations: ["6485f94fe63353dd9f5c4a8d", "6485f951e63353dd9f5c4a8f"],
            status: "operational",
            time: 8,
            createdAt: "2023-06-17T17:13:34.834Z",
            updatedAt: "2023-06-18T13:43:31.878Z",
            __v: 0,
            originalTime: 8,
        },
        {
            _id: "648de9fb92659667578bae81",
            name: "St4-St6",
            stations: ["6485f94ce63353dd9f5c4a8b", "6485f951e63353dd9f5c4a8f"],
            status: "operational",
            time: 17,
            createdAt: "2023-06-17T17:14:35.139Z",
            updatedAt: "2023-06-18T13:44:11.277Z",
            __v: 0,
            originalTime: 17,
        },
        {
            _id: "648dea1a92659667578bae83",
            name: "St6-St7",
            stations: ["6485f951e63353dd9f5c4a8f", "6485f956e63353dd9f5c4a91"],
            status: "operational",
            time: 10,
            createdAt: "2023-06-17T17:15:06.380Z",
            updatedAt: "2023-06-18T13:44:46.087Z",
            __v: 0,
            originalTime: 10,
        },
        {
            _id: "648e4dc2398d8fd81e03d788",
            name: "St3-St4",
            stations: ["6485f948e63353dd9f5c4a89", "6485f94ce63353dd9f5c4a8b"],
            status: "operational",
            time: 5,
            createdAt: "2023-06-18T00:20:18.783Z",
            updatedAt: "2023-06-18T13:45:26.583Z",
            __v: 0,
            originalTime: 5,
        },
    ];

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
            const weight = line.time;
            graph.addEdge(sourceStationId, targetStationId, weight);
        }
    });

    const shortestPath = graph.shortestPath(sourceStationId, targetStationId);
    return shortestPath;
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
