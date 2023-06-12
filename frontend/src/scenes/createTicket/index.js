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
import { Snackbar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ticketSchema = yup.object().shape({
    passenger_id: yup.string().required("Passenger ID is required"),
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
    purchase_date: yup.date().required("Purchase Date is required"),
});

const initialValues = {
    passenger_id: "",
    station_id: "",
    purchase_method: "",
    destination_id: "",
    purchase_date: "",
};

const CreateTicket = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [stations, setStations] = useState([]);

    const user = useSelector((state) => state.user._id);

    useEffect(() => {
        // Simulating fetching stations from an API or data source
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:8001/stations"); // Replace with your API endpoint
                const data = await response.json();
                console.log("HAHHA", data);
                setStations(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log("Ticket created:", values);
        onSubmitProps.resetForm();
        setShowSnackbar(true);
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
                                        select
                                    >
                                        {stations &&
                                            stations.map((station) => (
                                                <MenuItem
                                                    key={station.id}
                                                    value={station.id}
                                                >
                                                    {station.name}
                                                </MenuItem>
                                            ))}
                                    </TextField>
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
                                        select
                                    >
                                        {stations &&
                                            stations.map((station) => (
                                                <MenuItem
                                                    key={station.id}
                                                    value={station.id}
                                                >
                                                    {station.name}
                                                </MenuItem>
                                            ))}
                                    </TextField>
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

                                {/* BUTTON */}
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

                                <Snackbar
                                    open={showSnackbar}
                                    autoHideDuration={3000}
                                    onClose={() => setShowSnackbar(false)}
                                    message="Ticket created successfully!"
                                />

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
