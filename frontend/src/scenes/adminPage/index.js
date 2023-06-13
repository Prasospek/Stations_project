import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Modal, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8001/users");
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleRemoveUser = (userId) => {
        // Handle remove user logic here
        // You can make an API call to delete the user
        console.log(`Removing user with ID: ${userId}`);
    };

    const handleUpdateUser = (userId) => {
        // Handle update user logic here
        // You can navigate to a separate update user page or show a modal for editing
        console.log(`Updating user with ID: ${userId}`);
    };

    return <div>AdminPage</div>;
};

export default AdminPage;
