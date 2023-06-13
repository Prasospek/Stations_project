import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
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
            {users.map((user) => (
                <Box
                    key={user._id}
                    bgcolor={palette.primary.main}
                    color={palette.background.alt}
                    padding="1rem"
                    marginBottom="1rem"
                    borderRadius="5px"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    position="relative" // Add position relative for proper positioning
                >
                    <div>
                        <h4>{`${user.firstName} ${user.lastName}`}</h4>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
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
    );
};

export default AdminPage;
