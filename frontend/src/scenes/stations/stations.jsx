import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const Stations = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [stations, setStations] = useState([]);

    // Fetch stations from the backend or your API
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:8001/stations");
                const data = await response.json();
                setStations(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    return (
        <div>
            <Navbar />
            <Box p={2}>
                {stations.map((station) => (
                    <Box
                        key={station._id}
                        bgcolor={palette.primary.main}
                        color={palette.primary.contrastText}
                        p={2}
                        mb={2}
                    >
                        <h3>{station.name}</h3>
                        <p>Surface: {station.surface}</p>
                        <p>Connections: </p>
                        <p>Info Board ID: {station.info_board_id}</p>
                    </Box>
                ))}
            </Box>
            <Footer />
        </div>
    );
};

export default Stations;
