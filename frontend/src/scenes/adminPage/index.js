import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width:800px)");

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8001/users");
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemoveUser = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8001/users/${userId}`);
                // Remove the deleted user from the users state
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user._id !== userId)
                );
                console.log(`Removing user with ID: ${userId}`);
                toast.success(
                    `${user.firstName} ${user.lastName} deleted successfully!`
                );
            } catch (error) {
                console.error("Error removing user:", error);
                toast.error("Error, there was a mistake!");
            }
        }
    };

    const handleUpdateUser = (userId) => {
        // Handle update user logic here
        // You can navigate to a separate update user page or show a modal for editing
        console.log(`Updating user with ID: ${userId}`);
    };

    return (
        <div>
            <ToastContainer />
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginLeft: "3rem",
                    marginRight: "3rem",
                    marginTop: "2rem",
                }}
            >
                {users.map((user) => (
                    <Box
                        key={user._id}
                        bgcolor={palette.primary.main}
                        color={palette.background.alt}
                        padding="1rem"
                        marginBottom="1rem"
                        borderRadius="5px"
                        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                        width={isMobile ? "100%" : "48%"}
                        position="relative"
                        marginTop="1rem"
                    >
                        <div>
                            <h3>{`${user.firstName} ${user.lastName}`}</h3>
                            <p>Email: {user.email}</p>
                            <p style={{ wordBreak: "break-word" }}>
                                Password: {user.password}
                            </p>
                            <p>Role: {user.role}</p>
                        </div>
                        <div>
                            <IconButton
                                color="inherit"
                                onClick={() => handleRemoveUser(user._id)}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={() => handleUpdateUser(user._id)}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: "2rem",
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
