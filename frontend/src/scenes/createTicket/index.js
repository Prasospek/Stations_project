import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const CreateTicketForm = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [stationId, setStationId] = useState("");
    const [purchaseMethod, setPurchaseMethod] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [stations, setStations] = useState([]);

    const user = useSelector((state) => state.user._id);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get("/api/stations");
                setStations(response.data); // Assuming response.data is an array of station objects
            } catch (error) {
                console.error(error);
            }
        };

        fetchStations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authToken = localStorage.getItem("authToken");
        const decodedToken = jwt_decode(authToken);
        const passengerId = decodedToken.sub;

        try {
            const response = await axios.post(
                "/api/tickets",
                {
                    station_id: stationId,
                    purchase_method: purchaseMethod,
                    destination_id: destinationId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(response.data); // New ticket object

            navigate.push("/tickets"); // Redirect to tickets page after successful ticket creation
        } catch (error) {
            console.error(error);
        }
    };

    const getStationNameById = (id) => {
        const station = stations.find((station) => station._id === id);
        return station ? station.name : "";
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Station Name"
                value={getStationNameById(stationId)}
                onChange={(e) => setStationId(e.target.value)}
            />
            <TextField
                label="Purchase Method"
                value={purchaseMethod}
                onChange={(e) => setPurchaseMethod(e.target.value)}
            />
            <TextField
                label="Destination Name"
                value={getStationNameById(destinationId)}
                onChange={(e) => setDestinationId(e.target.value)}
            />
            <Button type="submit" variant="contained">
                Create Ticket
            </Button>
        </form>
    );
};

export default CreateTicketForm;
