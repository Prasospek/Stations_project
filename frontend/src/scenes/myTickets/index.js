import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const Tickets = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8001/users/${user._id}/tickets`
                );
                const data = await response.json();
                setTickets(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
                setError("Failed to fetch stations");
                setLoading(false);
            }
        };

        fetchTickets();
    }, [user._id]);


    const fetchStationName = async (stationId) => {
        try {
            const response = await fetch(
                `http://localhost:8001/stations/${stationId}`
            );
            const data = await response.save();
            console.log(data);
            return data.name;
        } catch (error) {
            console.error("Error fetching station:", error);
            return null;
        }
    };

    const [stationNames, setStationNames] = useState({});

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />

            <Box sx={{ padding: "16px" }}>
                <Typography variant="h6">My Tickets</Typography>
                {tickets.map((ticket, index) => (
                    <Box
                        key={ticket._id} // Add the key prop with a unique identifier
                        sx={{
                            backgroundColor: palette.primary.main,
                            color: palette.primary.contrastText,
                            marginBottom: "16px",
                            padding: "16px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            width: isNonMobile ? "calc(50% - 16px)" : "100%",
                            marginRight:
                                isNonMobile && index % 2 === 0 ? "16px" : "0",
                        }}
                    >
                        <Typography variant="body1">
                            <b>Passenger ID:</b> {ticket.passenger_id}
                        </Typography>
                        <Typography variant="body1">
                            <b>Ticket ID:</b> {ticket._id}
                        </Typography>
                        <Typography variant="body1">
                            <b>Purchase method:</b> {ticket.purchase_method}
                        </Typography>
                        <Typography variant="body1">
                            <b>Station Id NAME ?:</b> {ticket.station_id}
                        </Typography>
                        <Typography variant="body1">
                            <b>Destination NAME ? ID:</b>:{" "}
                            {ticket.destination_id}
                        </Typography>
                        <Typography variant="body1">
                            <b>Purchase Date: </b>{" "}
                            {new Date(ticket.purchase_date).toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Footer />
        </div>
    );
};

export default Tickets;
