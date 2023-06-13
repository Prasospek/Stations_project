import React, { useEffect, useState } from "react";
import {
    Box,
    useTheme,
    IconButton,
    useMediaQuery,
    Typography,
} from "@mui/material";
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

    const [editedUser, setEditedUser] = useState(null);

    const handleUpdateUser = (userId) => {
        const selected = users.find((user) => user._id === userId);
        setEditedUser(selected);
    };

    const handleCancelEdit = () => {
        setEditedUser(null);
    };

    const handleSaveUser = async () => {
        try {
            // Make an API call to update the user details in the server
            await axios.put(
                `http://localhost:8001/users/${editedUser._id}`,
                editedUser
            );
            // Update the users state with the updated user details
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === editedUser._id ? editedUser : user
                )
            );
            toast.success(
                `${editedUser.firstName} ${editedUser.lastName} updated successfully!`
            );
            setEditedUser(null); // Reset the edited user state
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error, there was a mistake!");
        }
    };

    return (
        <div>
            <ToastContainer />
            {editedUser && (
                <div>
                    <input
                        type="text"
                        value={editedUser.firstName}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                firstName: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        value={editedUser.lastName}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                lastName: e.target.value,
                            })
                        }
                    />
                    <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                email: e.target.value,
                            })
                        }
                    />
                    <input
                        type="password"
                        value={editedUser.password}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                password: e.target.value,
                            })
                        }
                    />
                    <button onClick={handleSaveUser}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}

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
                        overflow="hidden"
                    >
                        <div>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ fontSize: "1.7rem" }}
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontSize: "0.9rem" }}
                            >
                                <strong>First Name:</strong> {user.firstName}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontSize: "0.9rem" }}
                            >
                                <strong>Last Name:</strong> {user.lastName}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontSize: "0.9rem" }}
                            >
                                <strong>Email:</strong> {user.email}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontSize: "0.9rem" }}
                                style={{ wordBreak: "break-word" }}
                            >
                                <strong>Password:</strong> {user.password}
                            </Typography>
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
