import React, { useEffect, useState } from "react";
import {
    Box,
    useMediaQuery,
    useTheme,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TechnicianHomePage = () => {
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [trainLines, setTrainLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedTrainLineId, setSelectedTrainLineId] = useState(null); // New state for selected train line ID
    // eslint-disable-next-line
    const [originalTime, setOriginalTime] = useState(0);

    const fetchStationName = async (stationId) => {
        try {
            const response = await fetch(
                `http://localhost:8001/stations/${stationId}`
            );
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error("Error fetching station:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchTrainLines = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8001/trainlines"
                );
                const data = await response.json();

                setTrainLines(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
                setError("Failed to fetch stations");
                setLoading(false);
            }
        };

        fetchTrainLines();
    }, []);
    // adding [] so it doesn't fetch 24/7 but only when changed

    const [stationNames, setStationNames] = useState({});

    useEffect(() => {
        const fetchAllStationNames = async () => {
            const stationNamesMap = {};

            await Promise.all(
                trainLines.map(async (trainLine) => {
                    const stationNames = await Promise.all(
                        trainLine.stations.map(async (stationId) => {
                            const name = await fetchStationName(stationId);
                            return name;
                        })
                    );
                    stationNamesMap[trainLine._id] = stationNames;
                })
            );
            setStationNames(stationNamesMap);
        };
        fetchAllStationNames();
    }, [trainLines]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUpdater = (trainLineId) => {
        setSelectedTrainLineId(trainLineId); // Store the selected train line ID

        setOriginalTime(
            parseInt(
                trainLines.find((trainLine) => trainLine._id === trainLineId)
                    .time,
                10
            )
        );

        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleResetTime = async (trainLineId) => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset the time and status?"
        );

        if (confirmReset) {
            try {
                const response = await axios.put(
                    `http://localhost:8001/trainlines/${trainLineId}`,
                    {
                        time: trainLines.find(
                            (trainLine) => trainLine._id === trainLineId
                        ).originalTime,
                        status: "operational",
                    }
                );

                const updatedTrainLine = response.data;
                // Assuming trainLines is your current state or variable containing the train lines
                const updatedTrainLines = trainLines.map((trainLine) => {
                    if (trainLine._id === trainLineId) {
                        return updatedTrainLine;
                    }
                    return trainLine;
                });

                setTrainLines(updatedTrainLines); // Update the train lines with the reset time and status
            } catch (error) {
                console.error("Error updating train line:", error);
            }
        }
    };

    const handleOptionSelect = async (option) => {
        try {
            setSelectedOption(option);
            setDialogOpen(false); // Close the dialog

            if (option === "maintenance") {
                const inputTime = prompt("Enter maintenance time:");
                if (inputTime === null) {
                    // User clicked cancel
                    return;
                }
                if (!inputTime.trim()) {
                    // Empty input
                    toast.error("Invalid maintenance time");
                    return;
                }

                const maintenanceTime = parseInt(inputTime, 10);
                if (isNaN(maintenanceTime)) {
                    // Invalid input
                    toast.error("Invalid maintenance time");
                    return;
                }

                const originalTime = parseInt(
                    trainLines.find(
                        (trainLine) => trainLine._id === selectedTrainLineId
                    ).time,
                    10
                );
                if (isNaN(originalTime)) {
                    // Invalid original time
                    toast.error("Invalid original time");
                    return;
                }

                const updatedTime = originalTime + maintenanceTime;

                // Update the train line with the selected option and updated time
                const updatedTrainLines = trainLines.map((trainLine) => {
                    if (trainLine._id === selectedTrainLineId) {
                        return {
                            ...trainLine,
                            status: option,
                            time: updatedTime.toString(),
                        };
                    }
                    return trainLine;
                });
                setTrainLines(updatedTrainLines); // Update the train lines with the updated status and time

                toast.success("Changes saved successfully!");

                await axios.put(
                    `http://localhost:8001/trainlines/${selectedTrainLineId}`,
                    { status: option, time: updatedTime.toString() }
                );
            } else {
                // Update the train line with the selected option
                const updatedTrainLines = trainLines.map((trainLine) => {
                    if (trainLine._id === selectedTrainLineId) {
                        return { ...trainLine, status: option };
                    }
                    return trainLine;
                });
                setTrainLines(updatedTrainLines); // Update the train lines with the updated status

                toast.success("Changes saved successfully!");

                await axios.put(
                    `http://localhost:8001/trainlines/${selectedTrainLineId}`,
                    { status: option }
                );
            }
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Box
                p={2}
                display="flex"
                flexDirection={isSmallScreen ? "column" : "row"}
                flexWrap="wrap"
            >
                {trainLines.map((trainLine, index) => (
                    <Box
                        key={trainLine._id}
                        style={{
                            backgroundColor: palette.primary.main,
                            color: palette.primary.contrastText,
                            marginBottom: "14px",
                            padding: "0 14px 14px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            width: isNonMobile ? "calc(50% - 15px)" : "100%",
                            marginRight:
                                isNonMobile && index % 2 === 0 ? "15px" : "0",
                            display: "flex", // Added display property
                            flexDirection: "column", // Changed flex direction to column
                            alignItems: "flex-start", // Aligned items to start
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "27px",
                                marginBottom: "4px",
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            {trainLine.name}
                        </h2>

                        {trainLine.stations && (
                            <p
                                style={{
                                    marginBottom: "4px",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "15px",
                                }}
                            >
                                <b>Stations: </b>
                                {stationNames[trainLine._id]?.join(", ")}
                            </p>
                        )}
                        <p
                            style={{
                                marginBottom: "4px",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "15px",
                                color:
                                    trainLine.status === "disruption"
                                        ? "red"
                                        : trainLine.status === "operational"
                                        ? "green"
                                        : "yellow",
                            }}
                        >
                            <b>Status: </b>
                            {trainLine.status}
                        </p>
                        <p
                            style={{
                                marginBottom: "4px",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "15px",
                            }}
                        >
                            <b>Time: </b>
                            {trainLine.status === "disruption"
                                ? `(${trainLine.time})`
                                : trainLine.time}
                        </p>
                        <Box display="flex" justifyContent="left" mt={2}>
                            <IconButton
                                onClick={() => handleUpdater(trainLine._id)}
                            >
                                <EditIcon />
                            </IconButton>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleResetTime(trainLine._id)} // Pass the train line ID
                                style={{
                                    marginLeft: "10px",
                                    color: "purple",
                                    backgroundColor: "white",
                                }}
                            >
                                Reset Time & Status
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Select Status</DialogTitle>
                <DialogContent>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOptionSelect("operational")}
                        style={{ marginRight: "10px" }}
                    >
                        Operational
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOptionSelect("disruption")}
                        style={{ marginRight: "10px" }}
                    >
                        Disruption
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOptionSelect("maintenance")}
                    >
                        Maintenance
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TechnicianHomePage;
