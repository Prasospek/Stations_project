import React from "react";
import { Box, useTheme } from "@mui/material";

const Footer = () => {
    const { palette } = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: palette.primary.dark,
                color: palette.background.alt,
                padding: "1rem",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
            }}
        >
            <span>Prasospek ©</span>
        </Box>
    );
};

export default Footer;
