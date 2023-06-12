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

const ticketSchema = yup.object().shape({
    station_id: yup.string().required("Starter Station needs to be required "),
    purchase_method: yup
        .string()
        .oneOf(
            ["station", "online"],
            "Purchase Method must be either 'station' or 'online'"
        )
        .required("Purchase Method is required"),
    destination_id: yup
        .string()
        .required("Destination Station needs to be required "),
});

const initialValues = {
    station_id: "", // Update the field name
    station_name: "",
    purchase_method: "",
    destination_id: "", // Update the field name
    destination_name: "",
};

const CreateTicket = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:800px)");

    const [stations, setStations] = useState([]);

    const user = useSelector((state) => state.user._id);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:8001/stations");
                const data = await response.json();
                setStations(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    const createTicket = async (values, onSubmitProps) => {
        const createTicketResponse = await fetch(
            "http://localhost:8001/tickets",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const registered = await createTicketResponse.json();
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        createTicket();
        toast.success("Ticket created successfully!");
        onSubmitProps.resetForm();
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
                                        value={values.station_name}
                                        name="station_name"
                                        error={
                                            Boolean(touched.station_name) &&
                                            Boolean(errors.station_name)
                                        }
                                        helperText={
                                            touched.station_name &&
                                            errors.station_name
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <TextField
                                        label="Destination Station"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.destination_name}
                                        name="destination_name"
                                        error={
                                            Boolean(touched.destination_name) &&
                                            Boolean(errors.destination_name)
                                        }
                                        helperText={
                                            touched.destination_name &&
                                            errors.destination_name
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
