import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer/footer";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
    MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stations = {
    Station1: "6485f933e63353dd9f5c4a85",
    Station2: "6485f944e63353dd9f5c4a87",
    Station3: "6485f948e63353dd9f5c4a89",
    Station4: "6485f94ce63353dd9f5c4a8b",
    Station5: "6485f94fe63353dd9f5c4a8d",
    Station6: "6485f951e63353dd9f5c4a8f",
    Station7: "6485f956e63353dd9f5c4a91",
};

const ticketSchema = yup.object().shape({
    station_id: yup
        .string()
        .oneOf(Object.keys(stations), "Invalid Starter Station")
        .required("Starter Station is required"),
    purchase_method: yup
        .string()
        .oneOf(
            ["station", "online"],
            "Purchase Method must be either 'station' or 'online'"
        )
        .required("Purchase Method is required"),
    destination_id: yup
        .string()
        .oneOf(Object.keys(stations), "Invalid Destination Station")
        .required("Destination Station is required"),
});

const initialValues = {
    station_id: "",
    station_name: "",
    purchase_method: "",
    destination_id: "",
    destination_name: "",
};

const CreateTicket = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:800px)");

    const user = useSelector((state) => state.user._id);

    const createTicketHandle = async (values, onSubmitProps) => {
        try {
            const stationId = stations[values.station_id]; // Get the corresponding ID from the stations object
            const destinationId = stations[values.destination_id]; // Get the corresponding ID from the stations object

            const payload = {
                ...values,
                station_id: stationId,
                destination_id: destinationId,
            };

            const createTicketResponse = await fetch(
                "http://localhost:8001/tickets",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (createTicketResponse.ok) {
                // Ticket created successfully
                toast.success("Ticket created successfully!");
                onSubmitProps.resetForm();
            } else {
                // Error occurred while creating ticket
                const errorData = await createTicketResponse.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
            toast.error("An error occurred while creating the ticket.");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        createTicketHandle(values, onSubmitProps); // Pass the values to createTicketHandle function
    };

    return (
        <div>
            <Navbar />

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
            >
                <Box width="70%">
                    <h2>Buy Ticket</h2>

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={ticketSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile
                                                ? undefined
                                                : "span 4",
                                        },
                                    }}
                                >
                                    <TextField
                                        label="Starter Station"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.station_id}
                                        name="station_id"
                                        error={
                                            Boolean(touched.station_id) &&
                                            Boolean(errors.station_id)
                                        }
                                        helperText={
                                            touched.station_id &&
                                            errors.station_id
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <TextField
                                        label="Destination Station"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.destination_id}
                                        name="destination_id"
                                        error={
                                            Boolean(touched.destination_id) &&
                                            Boolean(errors.destination_id)
                                        }
                                        helperText={
                                            touched.destination_id &&
                                            errors.destination_id
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <TextField
                                        label="Purchase Method"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.purchase_method}
                                        name="purchase_method"
                                        select
                                        error={
                                            Boolean(touched.purchase_method) &&
                                            Boolean(errors.purchase_method)
                                        }
                                        helperText={
                                            touched.purchase_method &&
                                            errors.purchase_method
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    >
                                        <MenuItem value="station">
                                            Station
                                        </MenuItem>
                                        <MenuItem value="online">
                                            Online
                                        </MenuItem>
                                    </TextField>
                                </Box>

                                <Button
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": {
                                            color: palette.primary.main,
                                        },
                                    }}
                                >
                                    Create Ticket
                                </Button>

                                <ToastContainer />
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>

            <Footer />
        </div>
    );
};

export default CreateTicket;
