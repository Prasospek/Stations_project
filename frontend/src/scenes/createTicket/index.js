import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Box,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ticketSchema = yup.object().shape({
    station_id: yup
        .string()
        .min(6, "Password must be at least 2 characters a-Z0-9")
        .required("required and must be at least 2 characters a-Z0-9"),
    purchase_method: yup
        .string()
        .oneOf(
            ["Station", "Online"],
            "Purchase Method must be either 'station' or 'online'"
        )
        .required("Purchase Method is required"),
    destination_id: yup
        .string()
        .min(6, "Password must be at least 2 characters a-Z0-9")
        .required("required and must be at least 2 characters a-Z0-9"),
});

const initialTicketValues = {
    station_id: "",
    purchase_method: "",
    destination_id: "",
};

const CreateTicketForm = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handleTicketSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:8001/tickets", {
                passenger_id: userId,
                station_id: values.station_id,
                purchase_method: values.purchase_method,
                destination_id: values.destination_id,
            });

            console.log(response.data); // New ticket object

            // Reset form fields
            values.station_id = "";
            values.purchase_method = "";
            values.destination_id = "";

            toast.success("Ticket created successfully");
        } catch (error) {
            console.error("Error creating ticket:", error.message);
            toast.error("Error creating ticket");
        }
    };

    return (
        <Formik
            initialValues={initialTicketValues}
            validationSchema={ticketSchema}
            onSubmit={handleTicketSubmit}
        >
            {(formik) => (
                <form onSubmit={formik.handleTicketSubmit}>
                    <Select
                        label="Station"
                        name="station_id"
                        value={formik.values.station_id}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.station_id &&
                            Boolean(formik.errors.station_id)
                        }
                        required
                        fullWidth
                    >
                        {stations.map((station) => (
                            <MenuItem key={station._id} value={station._id}>
                                {station.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        label="Purchase Method"
                        name="purchase_method"
                        value={formik.values.purchase_method}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.purchase_method &&
                            Boolean(formik.errors.purchase_method)
                        }
                        required
                        fullWidth
                    >
                        <MenuItem value="Online">Online</MenuItem>
                        <MenuItem value="Station">Station</MenuItem>
                    </Select>

                    <Select
                        label="Destination"
                        name="destination_id"
                        value={formik.values.destination_id}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.destination_id &&
                            Boolean(formik.errors.destination_id)
                        }
                        required
                        fullWidth
                    >
                        {stations.map((station) => (
                            <MenuItem key={station._id} value={station._id}>
                                {station.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                    >
                        Create Ticket
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default CreateTicketForm;
