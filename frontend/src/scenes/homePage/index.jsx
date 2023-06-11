import React, { useState } from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme, Modal, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import { height } from "@mui/system";

const HomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [showModal, setShowModal] = useState(false);

    const handleStations = () => {
        navigate("/stations");
    };

    const handleDisplayRoutes = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar />
            <Box
                display="grid"
                gridTemplateColumns={
                    isSmallScreen ? "1fr" : "repeat(2, minmax(0, 1fr))"
                }
                gap={2}
                margin="2rem"
            >
                <Box
                    bgcolor={palette.primary.main}
                    color={palette.background.alt}
                    padding="2rem"
                    textAlign="center"
                    borderRadius="5px"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                    style={{ cursor: "pointer" }}
                >
                    <h2>Buy ticket</h2>
                </Box>
                <Box
                    bgcolor={palette.primary.main}
                    color={palette.background.alt}
                    padding="2rem"
                    textAlign="center"
                    borderRadius="5px"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                    style={{ cursor: "pointer" }}
                >
                    <h2>My tickets</h2>
                </Box>
                <Box
                    bgcolor={palette.primary.main}
                    color={palette.background.alt}
                    padding="2rem"
                    textAlign="center"
                    borderRadius="5px"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStations()}
                >
                    <h2>All Stations</h2>
                </Box>
                <Box
                    bgcolor={palette.primary.main}
                    color={palette.background.alt}
                    padding="2rem"
                    textAlign="center"
                    borderRadius="5px"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDisplayRoutes()}
                >
                    <h2>Display of routes linked to each Station</h2>
                </Box>
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
                            src={`${process.env.PUBLIC_URL}/assets/Train_structure.jpg`}
                            alt="Routes Image"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </Box>
                </Fade>
            </Modal>

            <div
                style={{
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <div className="roll-container">
                    <div className="roll-content">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture5.jpg`}
                            alt="Credit 1"
                            style={{ width: "40%", height: "40%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture1.jpg`}
                            alt="Credit 2"
                            style={{ width: "40%", height: "40%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture2.jpg`}
                            alt="Credit 3"
                            style={{ width: "40%", height: "40%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture3.jpg`}
                            alt="Credit 3"
                            style={{ width: "40%", height: "40%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture4.jpg`}
                            alt="Credit 3"
                            style={{ width: "40%", height: "40%" }}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
