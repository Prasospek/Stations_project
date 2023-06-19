import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import {
    Box,
    useMediaQuery,
    useTheme,
    Typography,
    Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const Tickets = () => {
    const { palette } = useTheme();
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
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error("Error fetching station:", error);
            return null;
        }
    };

    const fetchDestinationName = async (destinationId) => {
        try {
            const response = await fetch(
                `http://localhost:8001/stations/${destinationId}`
            );
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error("Error fetching destination:", error);
            return null;
        }
    };

    const [stationNames, setStationNames] = useState({});
    const [destinationNames, setDestinationNames] = useState({});

    useEffect(() => {
        const fetchAllStationNames = async () => {
            const stationNamesMap = {};

            await Promise.all(
                tickets.map(async (ticket) => {
                    const name = await fetchStationName(ticket.station_id);
                    stationNamesMap[ticket.station_id] = name;
                })
            );
            setStationNames(stationNamesMap);
        };

        const fetchAllDestinationNames = async () => {
            const destinationNamesMap = {};

            await Promise.all(
                tickets.map(async (ticket) => {
                    const name = await fetchDestinationName(
                        ticket.destination_id
                    );
                    destinationNamesMap[ticket.destination_id] = name;
                })
            );
            setDestinationNames(destinationNamesMap);
        };

        fetchAllStationNames();
        fetchAllDestinationNames();
    }, [tickets]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            {tickets.length > 0 ? (
                <Box sx={{ padding: "16px" }}>
                    <h1
                        style={{
                            fontSize: "28px",
                            marginBottom: "15px",
                        }}
                    >
                        My Tickets
                    </h1>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > div": {
                                backgroundColor: palette.primary.main,
                                color: palette.primary.contrastText,
                                marginBottom: "16px",
                                padding: "16px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                width: isNonMobile
                                    ? "calc(50% - 16px)"
                                    : "100%",
                                marginRight:
                                    isNonMobile && !isSmallScreen && "16px",
                            },
                        }}
                    >
                        {tickets.map((ticket) => (
                            <Box
                                key={ticket._id} // Add the key prop with a unique identifier
                            >
                                <Typography variant="body1">
                                    <b>Passenger ID:</b> {ticket.passenger_id}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Ticket ID:</b> {ticket._id}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Purchase method:</b>{" "}
                                    {ticket.purchase_method}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Station Name:</b>{" "}
                                    {stationNames[ticket.station_id] ||
                                        "Unknown"}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Destination Name:</b>{" "}
                                    {destinationNames[ticket.destination_id] ||
                                        "Unknown"}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Purchase Date: </b>{" "}
                                    {new Date(
                                        ticket.purchase_date
                                    ).toLocaleString()}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        margin: "20px auto",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            margin: "0 0 10px",
                        }}
                    >
                        You have no tickets ! Would you like to buy one?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/tickets")}
                    >
                        Buy Ticket
                    </Button>
                </Box>
            )}

            <Box sx={{ marginTop: "3rem" }}>
                <Footer />
            </Box>
        </div>
    );
};

export default Tickets;
