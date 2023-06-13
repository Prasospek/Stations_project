import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar";
import Footer from "../footer/footer";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    useMediaQuery,
    useTheme,
    Box,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ticketSchema = yup.object().shape({
    station_id: yup
        .string()
        .min(6, "Station ID must be at least 6 characters")
        .required("Station ID is required"),
    purchase_method: yup
        .string()
        .oneOf(
            ["Station", "Online"],
            "Purchase Method must be either 'Station' or 'Online'"
        )
        .required("Purchase Method is required"),
    destination_id: yup
        .string()
        .min(6, "Destination ID must be at least 6 characters")
        .required("Destination ID is required"),
});

const initialTicketValues = {
    station_id: "",
    purchase_method: "",
    destination_id: "",
};

const CreateTicketForm = () => {
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:800px)");

    const [stations, setStations] = useState([]);
    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios.get("http://localhost:8001/stations");
            setStations(response.data);
        } catch (error) {
            console.error("Error fetching stations:", error.message);
        }
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:8001/tickets", {
                passenger_id: userId,
                station_id: values.station_id,
                purchase_method: values.purchase_method,
                destination_id: values.destination_id,
            });

            console.log(response.data); // New ticket object

            // Reset form fields
            resetForm();

            toast.success("Ticket created successfully");
        } catch (error) {
            console.error("Error creating ticket:", error.message);
            toast.error("Error creating ticket");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45vh"
            >
                <Box width="70%">
                    <h2>Buy Ticket</h2>
                    <Formik
                        initialValues={initialTicketValues}
                        validationSchema={ticketSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile
                                                ? undefined
                                                : "span 2",
                                        },
                                    }}
                                >
                                    <Select
                                        label="Station"
                                        name="station_id"
                                        value={values.station_id}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.station_id &&
                                            Boolean(errors.station_id)
                                        }
                                        required
                                        fullWidth
                                    >
                                        {stations.map((station) => (
                                            <MenuItem
                                                key={station._id}
                                                value={station._id}
                                            >
                                                {station.name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Purchase Method"
                                        name="purchase_method"
                                        value={values.purchase_method}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.purchase_method &&
                                            Boolean(errors.purchase_method)
                                        }
                                        required
                                        fullWidth
                                    >
                                        <MenuItem value="Online">
                                            Online
                                        </MenuItem>
                                        <MenuItem value="Station">
                                            Station
                                        </MenuItem>
                                    </Select>

                                    <Select
                                        label="Destination"
                                        name="destination_id"
                                        value={values.destination_id}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.destination_id &&
                                            Boolean(errors.destination_id)
                                        }
                                        required
                                        fullWidth
                                    >
                                        {stations.map((station) => (
                                            <MenuItem
                                                key={station._id}
                                                value={station._id}
                                            >
                                                {station.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                        marginTop: "1rem",
                                    }}
                                >
                                    Create Ticket
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};

export default CreateTicketForm;
