import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const CreateTicketForm = () => {
    const [purchaseMethod, setPurchaseMethod] = useState("");
    const [stationId, setStationId] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [stations, setStations] = useState([]);

    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios.get("http://localhost:8001/stations");
            setStations(response.data);
        } catch (error) {
            console.error("Error fetching stations:", error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8001/tickets", {
                passenger_id: userId,
                station_id: stationId,
                purchase_method: purchaseMethod,
                destination_id: destinationId,
            });

            console.log(response.data); // New ticket object

            // Reset form fields
            setStationId("");
            setPurchaseMethod("");
            setDestinationId("");
        } catch (error) {
            console.error("Error creating ticket:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Select
                label="Station"
                name="station_id"
                value={stationId}
                onChange={(e) => setStationId(e.target.value)}
                required
                fullWidth
            >
                {stations.map((station) => (
                    <MenuItem key={station._id} value={station._id}>
                        {station.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                label="Purchase Method"
                name="purchase_method"
                value={purchaseMethod}
                onChange={(e) => setPurchaseMethod(e.target.value)}
                required
                fullWidth
            />
            <Select
                label="Destination ID"
                name="destination_id"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                required
                fullWidth
            >
                {stations.map((station) => (
                    <MenuItem key={station._id} value={station._id}>
                        {station.name}
                    </MenuItem>
                ))}
            </Select>
            <Button type="submit" variant="contained">
                Create Ticket
            </Button>
        </form>
    );
};

export default CreateTicketForm;
