import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Modal, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const user = useSelector((state) => state.user);
    const userRole = useSelector((state) => state.user.role);

    const [showModal, setShowModal] = useState(false);

    const handleStations = () => {
        navigate("/stations");
    };

    const handleMyTickets = () => {
        navigate(`/users/${user._id}/tickets`);
    };

    const handleBuyTicket = () => {
        navigate(`/tickets`);
    };

    const handleDisplayRoutes = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
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
                    onClick={handleBuyTicket}
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
                    onClick={handleMyTickets}
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
                    onClick={handleStations}
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
                    onClick={handleDisplayRoutes}
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
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        />
                    </Box>
                </Fade>
            </Modal>

            <div style={{ width: "100%", overflow: "hidden" }}>
                <div className="roll-container" style={{ height: "400px" }}>
                    <div
                        className="roll-content"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture5.jpg`}
                            alt="Credit 1"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture1.jpg`}
                            alt="Credit 2"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture2.jpg`}
                            alt="Credit 3"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture3.jpg`}
                            alt="Credit 4"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture4.jpg`}
                            alt="Credit 5"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture6.jpg`}
                            alt="Credit 6"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture7.jpg`}
                            alt="Credit 7"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture8.jpg`}
                            alt="Credit 8"
                            style={{ width: "auto", height: "100%" }}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/picture9.jpg`}
                            alt="Credit 9"
                            style={{ width: "auto", height: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHomePage;
