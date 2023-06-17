import TrainLine from "../models/TrainLine.js";
import Station from "../models/Station.js";

// A* algorithm implementation
export async function calculateShortestRoute(
    startStationId,
    destinationStationId
) {
    // Get the start and destination stations
    const startStation = await Station.findById(startStationId);
    const destinationStation = await Station.findById(destinationStationId);

    // Create a priority queue to store the stations to be explored
    const priorityQueue = new PriorityQueue();

    // Initialize the start station with a distance of 0
    startStation.distance = 0;

    // Enqueue the start station
    priorityQueue.enqueue(startStation, 0);

    // Keep track of the visited stations
    const visited = new Set();

    // Keep track of the shortest path from each station
    const shortestPath = new Map();
    shortestPath.set(startStation, null);

    while (!priorityQueue.isEmpty()) {
        // Dequeue the station with the lowest priority (shortest distance)
        const currentStation = priorityQueue.dequeue().element;

        // Check if the current station is the destination
        if (currentStation._id.equals(destinationStationId)) {
            // Build the shortest path from the destination to the start station
            const path = buildShortestPath(shortestPath, destinationStation);

            // Return the shortest path
            return path;
        }

        // Mark the current station as visited
        visited.add(currentStation);

        // Explore the neighbors (connections) of the current station
        for (const connection of currentStation.connections) {
            const neighborStation = connection.station;

            // Calculate the tentative distance from the start station to the neighbor station
            const distanceToNeighbor =
                currentStation.distance + connection.distance;

            // Update the neighbor station's distance if it's shorter than the current distance
            if (
                !neighborStation.distance ||
                distanceToNeighbor < neighborStation.distance
            ) {
                neighborStation.distance = distanceToNeighbor;
                shortestPath.set(neighborStation, currentStation);

                // Calculate the priority (f-score) for the neighbor station (A* heuristic)
                const priority =
                    distanceToNeighbor +
                    heuristic(neighborStation, destinationStation);

                // Enqueue the neighbor station with its priority
                priorityQueue.enqueue(neighborStation, priority);
            }
        }
    }

    // If no path is found, return null
    return null;
}

// Helper function to build the shortest path from the destination to the start station
function buildShortestPath(shortestPath, destinationStation) {
    const path = [destinationStation];
    let currentStation = destinationStation;

    while (shortestPath.get(currentStation)) {
        currentStation = shortestPath.get(currentStation);
        path.unshift(currentStation);
    }

    return path;
}

// Heuristic function for the A* algorithm (you can customize this based on your needs)
function heuristic(stationA, stationB) {
    // For simplicity, let's assume the heuristic is the straight-line distance between two stations
    const latA = stationA.coordinates[0];
    const lonA = stationA.coordinates[1];
    const latB = stationB.coordinates[0];
    const lonB = stationB.coordinates[1];

    // Calculate the Euclidean distance between the coordinates
    const distance = Math.sqrt(
        Math.pow(latA - latB, 2) + Math.pow(lonA - lonB, 2)
    );

    return distance;
}

// Priority queue implementation for A* algorithm
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
        if (this.isEmpty()) {
            return null;
        }

        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

export async function findPath(req, res) {
    try {
        const { startStationId, destinationStationId } = req.body;

        const shortestPath = await calculateShortestRoute(
            startStationId,
            destinationStationId
        );

        if (shortestPath) {
            res.status(200).json({ path: shortestPath });
        } else {
            res.status(404).json({ error: "No path found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

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
        const { name, stations, status, time } = req.body;

        const updatedTrainLine = await TrainLine.findByIdAndUpdate(
            id,
            {
                name,
                stations,
                status,
                time,
            },
            { new: true }
        );

        if (!updatedTrainLine) {
            return res.status(404).json({ error: "TrainLine not found !" });
        }

        res.status(200).json({
            message: "Ticket updated successfully",
            updateTrainLine,
        });
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
        const { name, stations, status, time } = req.body;

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
