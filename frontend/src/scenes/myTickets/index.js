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
                {tickets.map((ticket) => (
                    <Box
                        key={ticket._id}
                        sx={{
                            border: `1px solid ${palette.divider}`,
                            borderRadius: "8px",
                            padding: "16px",
                            margin: "8px 0",
                        }}
                    >
                        <Typography variant="body1">
                            Passenger ID: {ticket.passenger_id}
                        </Typography>
                        <Typography variant="body1">
                            Ticket ID: {ticket.ticket_id}
                        </Typography>
                        <Typography variant="body1">
                            Purchase Method: {ticket.purchase_method}
                        </Typography>
                        <Typography variant="body1">
                            Destination ID: {ticket.destination_id}
                        </Typography>
                        <Typography variant="body1">
                            Purchase Date:{" "}
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
