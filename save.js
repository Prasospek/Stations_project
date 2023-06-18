import TrainLine from "../models/TrainLine.js";
import Station from "../models/Station.js";

export const findShortestPath = async (sourceStationId, targetStationId) => {
    const trainLines = await TrainLine.find({}).populate("stations");

    // Create a map of station IDs to their corresponding train line and index
    const stationMap = new Map();
    trainLines.forEach((trainLine) => {
        trainLine.stations.forEach((station, index) => {
            stationMap.set(station._id.toString(), { trainLine, index });
        });
    });

    // Create a priority queue to store the nodes and their distances from the source station
    const priorityQueue = new PriorityQueue();

    // Initialize the distances of all stations as Infinity except the source station
    const distances = new Map();
    trainLines.forEach((trainLine) => {
        trainLine.stations.forEach((station) => {
            distances.set(station._id.toString(), Infinity);
        });
    });
    distances.set(sourceStationId.toString(), 0);

    // Initialize the previous station map to store the previous station for each station
    const previousStations = new Map();

    // Add the source station to the priority queue
    priorityQueue.enqueue(sourceStationId.toString(), 0);

    while (!priorityQueue.isEmpty()) {
        const currentStationId = priorityQueue.dequeue();
        const currentDistance = distances.get(currentStationId);

        if (currentStationId === targetStationId.toString()) {
            // Reached the target station, stop the algorithm
            break;
        }

        const currentStation = stationMap.get(currentStationId);

        // Visit each neighboring station of the current station
        const neighboringStations = currentStation.trainLine.stations;
        for (let i = 0; i < neighboringStations.length; i++) {
            const neighboringStationId = neighboringStations[i]._id.toString();
            const neighboringStation = stationMap.get(neighboringStationId);
            const weight = neighboringStation.index - currentStation.index;

            // Calculate the new distance from the source station to the neighboring station
            const distanceToNeighboringStation = currentDistance + weight;

            if (
                distanceToNeighboringStation <
                distances.get(neighboringStationId)
            ) {
                // Found a shorter path, update the distance and enqueue the neighboring station
                distances.set(
                    neighboringStationId,
                    distanceToNeighboringStation
                );
                previousStations.set(neighboringStationId, currentStationId);
                priorityQueue.enqueue(
                    neighboringStationId,
                    distanceToNeighboringStation
                );
            }
        }
    }

    // Reconstruct the shortest path from the source station to the target station
    const shortestPath = [];
    let currentStationId = targetStationId.toString();
    while (previousStations.has(currentStationId)) {
        shortestPath.unshift(currentStationId);
        currentStationId = previousStations.get(currentStationId);
    }
    shortestPath.unshift(sourceStationId.toString());

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
