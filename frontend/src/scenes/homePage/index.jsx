import React from "react";
import Navbar from "../navbar";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const HomePage = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    return (
        <div>
            <Navbar />
            HomePage
            <h3>If (user.role === "user) Bude tu X velkych boxi a na vyber</h3>
            <h4>Kupit lístek</h4>
            <h4>Moje lístky</h4>
            <h4>Vsechny stanice</h4>
            <h4>Zobrazit propojení stanic (img z drawio)</h4>
            <h4>Dole random div s informace lorem + obrazek</h4>
        </div>
    );
};

export default HomePage;
