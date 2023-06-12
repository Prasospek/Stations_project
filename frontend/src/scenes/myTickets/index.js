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

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.user);

    // Fetch Stations
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
    }, [user._id]); // here as dependency because the value will / could change

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />

            <Footer />
        </div>
    );
};

export default Stations;
