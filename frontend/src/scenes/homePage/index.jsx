import React from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const HomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

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
                >
                    <h2>Display of routes linked to each Station</h2>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};

export default HomePage;
