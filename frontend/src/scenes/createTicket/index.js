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
    Modal,
    Fade,
    Box,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
    const [trainLines, setTrainLines] = useState([]);
    const userId = useSelector((state) => state.user._id);
    const navigate = useNavigate();
    const [shortestPath, setShortestPath] = useState([]);
    const [selectedStationId, setSelectedStationId] = useState("");
    const [selectedDestinationId, setSelectedDestinationId] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleDisplayRoutes = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchStations();
        fetchTrainLines();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios.get("http://localhost:8001/stations");
            setStations(response.data);
        } catch (error) {
            console.error("Error fetching stations:", error.message);
        }
    };

    const fetchTrainLines = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8001/trainlines"
            );
            setTrainLines(response.data);
        } catch (error) {
            console.error("Error fetching train lines:", error.message);
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
            navigate("/home");
        } catch (error) {
            console.error("Error creating ticket:", error.message);
            toast.error("Error creating ticket");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetrieveIds = () => {
        console.log("Selected Station ID:", selectedStationId);
        console.log("Selected Destination ID:", selectedDestinationId);
    };

    const handleShowShortestPath = async () => {
        try {
            // Make a request to fetch the shortest path
            const response = await axios.get(
                `http://localhost:8001/trainlines/shortest-path/${selectedStationId}/${selectedDestinationId}`
            );

            const shortestPathIds = response.data.shortestPath;

            // Fetch station names based on the IDs
            const shortestPathNames = await Promise.all(
                shortestPathIds.map(async (stationId) => {
                    const stationResponse = await axios.get(
                        `http://localhost:8001/stations/${stationId}`
                    );
                    return stationResponse.data.name;
                })
            );

            setShortestPath(shortestPathNames);
        } catch (error) {
            console.error("Error fetching shortest path:", error.message);
        }
    };

    const getDisruptedTrainLines = () => {
        return trainLines.filter((line) => line.status === "disruption");
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
                <Box width="70%" marginTop={"15rem"}>
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
                                <Box display="grid" gap="30px">
                                    <Select
                                        label="Station"
                                        id="station_id"
                                        name="station_id"
                                        value={values.station_id}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setSelectedStationId(
                                                event.target.value
                                            );
                                        }}
                                        onBlur={handleBlur}
                                        error={
                                            touched.station_id &&
                                            Boolean(errors.station_id)
                                        }
                                        required
                                        fullWidth
                                        sx={{
                                            gridColumn: isNonMobile
                                                ? undefined
                                                : "span 2",
                                        }}
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
                                        sx={{
                                            gridColumn: isNonMobile
                                                ? undefined
                                                : "span 2",
                                        }}
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
                                        onChange={(event) => {
                                            handleChange(event);
                                            setSelectedDestinationId(
                                                event.target.value
                                            );
                                        }}
                                        onBlur={handleBlur}
                                        error={
                                            touched.destination_id &&
                                            Boolean(errors.destination_id)
                                        }
                                        required
                                        fullWidth
                                        sx={{
                                            gridColumn: isNonMobile
                                                ? undefined
                                                : "span 2",
                                        }}
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

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            sx={{
                                                marginTop: "-1rem",
                                                padding: "0.9rem",
                                            }}
                                        >
                                            Create Ticket
                                        </Button>

                                        <Button
                                            variant="contained"
                                            onClick={handleShowShortestPath}
                                            sx={{
                                                marginTop: isNonMobile
                                                    ? "-1rem"
                                                    : "1rem",
                                                marginLeft: "1rem", // Add left margin to create space between buttons
                                                width: isNonMobile
                                                    ? undefined
                                                    : "100%",
                                                padding: "0.9rem",
                                            }}
                                        >
                                            Show Shortest Path
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>

                    {shortestPath.length > 0 && (
                        <Box sx={{ marginTop: "1rem" }}>
                            <h3>Shortest Path: {shortestPath.join(" -> ")}</h3>
                        </Box>
                    )}

                    <Box sx={{ marginTop: "2rem" }}>
                        <h2>Disrupted Train Lines</h2>
                        {getDisruptedTrainLines().length > 0 ? (
                            getDisruptedTrainLines().map((line) => (
                                <div key={line._id}>
                                    <p>
                                        <b>Name:</b> {line.name}
                                    </p>
                                    <p>
                                        <b>Status:</b> {line.status}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No disrupted train lines right now</p>
                        )}
                    </Box>

                    <Box sx={{ marginTop: "2rem" }}>
                        <h2>Maintenance Time</h2>
                        {trainLines.filter(
                            (line) => line.status === "maintenance"
                        ).length > 0 ? (
                            trainLines.map((line) => {
                                if (line.status === "maintenance") {
                                    return (
                                        <div key={line._id}>
                                            <p>
                                                <b>Name:</b> {line.name}
                                            </p>
                                            <p>
                                                <b>Maintenance Time:</b>{" "}
                                                {line.time} minutes from
                                                original {line.originalTime}{" "}
                                                minutes
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <p>No maintenance train lines right now</p>
                        )}
                    </Box>

                    <Box
                        bgcolor={palette.primary.main}
                        color={palette.background.alt}
                        padding="0.8rem"
                        textAlign="center"
                        borderRadius="5px"
                        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                        style={{ cursor: "pointer" }}
                        onClick={handleDisplayRoutes}
                    >
                        <h2>Routes</h2>
                    </Box>

                    <Modal
                        open={showModal}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Fade in={showModal}>
                            <Box
                                style={{
                                    maxWidth: "90%",
                                    maxHeight: "90%",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/Train_structure.png`}
                                    alt="Routes Image"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                    }}
                                />
                            </Box>
                        </Fade>
                    </Modal>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};
export default CreateTicketForm;
