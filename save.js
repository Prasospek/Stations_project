import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TechnicianHomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [trainLines, setTrainLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const [stationNames, setStationNames] = useState({});

    useEffect(() => {
        const fetchAllStationNames = async () => {
            const stationNamesMap = {};

            await Promise.all(
                trainLines.map(async (trainLine) => {
                    const name = await fetchStationName(trainLine.station_id);
                    stationNamesMap[trainLine.station_id] = name;
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
                                <b>Stations: {trainLine.stations}</b>{" "}
                            </p>
                        )}
                        <p
                            style={{
                                marginBottom: "4px",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "15px",
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
                            {trainLine.time}
                        </p>
                    </Box>
                ))}
            </Box>

            <Box mb={5}></Box>
        </div>
    );
};

export default TechnicianHomePage;
