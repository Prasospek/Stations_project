import React, { useEffect, useState } from "react";
import {
    Box,
    useTheme,
    IconButton,
    useMediaQuery,
    Typography,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as yup from "yup";

const AdminPage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width:800px)");

    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    /* FORMIK YUP */

    const registerSchema = yup.object().shape({
        firstName: yup
            .string()
            .min(2, "Password must be at least 2 characters a-Z0-9")
            .required("required and must be at least 2 characters a-Z0-9"),
        lastName: yup
            .string()
            .min(2, "Password must be at least 2 characters a-Z0-9")
            .required("required and must be at least 2 characters a-Z0-9"),
        email: yup
            .string()
            .email("Email must contain @ followed by .com .cz etc")
            .required("required"),
        password: yup
            .string()
            .min(5, "Password must be at least 5 characters")
            .required("required"),
    });

    const fetchUsers = async () => {
        try {
            //const response = await axios.get("http://localhost:8001/users");
            const response = await axios.get(
                "http://localhost:8001/users?_embed=tickets"
            );
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

    const handleUpdateUser = (user) => {
        setIsEditing(true);
        setEditedUser(user);
    };

    const handleSaveChanges = async () => {
        try {
            const confirmed = window.confirm(
                "Do you want to save the changes you made?"
            );

            if (confirmed) {
                await axios.put(
                    `http://localhost:8001/users/${editedUser._id}`,
                    editedUser
                );
                // Update the user in the users state
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === editedUser._id ? editedUser : user
                    )
                );
                setIsEditing(false);
                toast.success("Changes saved successfully!");
            }
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.error("Error, there was a mistake!");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser({});
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
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        borderRadius="7px"
                        width={isMobile ? "100%" : "49%"}
                    >
                        {isEditing && editedUser._id === user._id ? (
                            <div>
                                <Typography variant="h6">
                                    Editing User:
                                </Typography>
                                <Formik
                                    initialValues={{
                                        firstName: editedUser.firstName,
                                        lastName: editedUser.lastName,
                                        email: editedUser.email,
                                        password: editedUser.password,
                                    }}
                                    validationSchema={registerSchema}
                                    onSubmit={handleSaveChanges}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                        touched,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box marginTop="1rem">
                                                <Typography variant="body1">
                                                    First Name:
                                                </Typography>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={values.firstName}
                                                    onChange={handleChange}
                                                />
                                                {errors.firstName &&
                                                    touched.firstName && (
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                            style={{
                                                                color: "black",
                                                            }}
                                                        >
                                                            {errors.firstName}
                                                        </Typography>
                                                    )}
                                            </Box>
                                            <Box marginTop="1rem">
                                                <Typography variant="body1">
                                                    Last Name:
                                                </Typography>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={values.lastName}
                                                    onChange={handleChange}
                                                />
                                                {errors.lastName &&
                                                    touched.lastName && (
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                        >
                                                            {errors.lastName}
                                                        </Typography>
                                                    )}
                                            </Box>
                                            <Box marginTop="1rem">
                                                <Typography variant="body1">
                                                    Email:
                                                </Typography>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email &&
                                                    touched.email && (
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                        >
                                                            {errors.email}
                                                        </Typography>
                                                    )}
                                            </Box>
                                            <Box marginTop="1rem">
                                                <Typography variant="body1">
                                                    Password:
                                                </Typography>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password &&
                                                    touched.password && (
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                        >
                                                            {errors.password}
                                                        </Typography>
                                                    )}
                                            </Box>
                                            <Box
                                                marginTop="1rem"
                                                display="flex"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        ) : (
                            <div>
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    fontSize={"1.5rem"}
                                >
                                    {`${user.firstName} ${user.lastName}`}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize={"0.95rem"}
                                >
                                    <strong>First Name:</strong>{" "}
                                    {user.firstName}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize={"0.95rem"}
                                >
                                    <strong>Last Name:</strong> {user.lastName}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize={"0.95rem"}
                                >
                                    <strong>Email:</strong> {user.email}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    style={{ wordBreak: "break-word" }}
                                    fontSize={"0.95rem"}
                                >
                                    <strong>Password:</strong> {user.password}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize={"0.95rem"}
                                >
                                    <strong>Role:</strong> {user.role}
                                </Typography>
                                <Box marginTop="0.95rem" display="flex">
                                    <IconButton
                                        color="inherit"
                                        onClick={() =>
                                            handleRemoveUser(user._id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        color="inherit"
                                        onClick={() => handleUpdateUser(user)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </div>
                        )}
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
