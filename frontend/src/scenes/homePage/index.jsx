import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Footer from "../footer/footer";
import AdminPage from "../adminPage";
import UserHomePage from "../userHomePage";
import TechnicianHomePage from "../technicianHomePage";

const HomePage = () => {
    const userRole = useSelector((state) => state.user.role);

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
            {userRole === "technician" && (
                <>
                    <TechnicianHomePage />
                    <Box paddingBottom={"5rem"}></Box>
                </>
            )}
            <Footer />
        </div>
    );
};

export default HomePage;
