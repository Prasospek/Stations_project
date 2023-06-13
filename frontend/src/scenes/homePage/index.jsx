import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme, Modal, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import AdminPage from "../adminPage";
import UserHomePage from "../userHomePage";

const HomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const user = useSelector((state) => state.user);
    const userRole = useSelector((state) => state.user.role);

    const [showModal, setShowModal] = useState(false);

    const handleStations = () => {
        navigate("/stations");
    };

    const handleMyTickets = () => {
        navigate(`/users/${user._id}/tickets`);
    };

    const handleBuyTicket = () => {
        navigate(`/tickets`);
    };

    const handleDisplayRoutes = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar />
            {userRole === "user" && (
                <>
                    <UserHomePage />
                </>
            )}
            {userRole === "admin" && (
                <>
                    <AdminPage />
                    <Box paddingBottom={"5rem"}></Box>
                </>
            )}
            <Footer />
        </div>
    );
};

export default HomePage;
