import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const Stations = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [stations, setStations] = useState([]);

    // Fetch Stations
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:8001/stations");
                const data = await response.json();
                setStations(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    const fetchInfoBoardContent = async (infoBoardId) => {
        try {
            const response = await fetch(
                `http://localhost:8001/info-boards/${infoBoardId}`
            );
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error("Error fetching InfoBoard content:", error);
            return null;
        }
    };

    const [infoBoardContents, setInfoBoardContents] = useState({});

    useEffect(() => {
        const fetchAllInfoBoardContents = async () => {
            const infoBoardContentsMap = {};

            await Promise.all(
                stations.map(async (station) => {
                    if (station.info.board_id) {
                        const content = await fetchAllInfoBoardContents(
                            station.info_board_id
                        );
                        infoBoardContentsMap[station._id] = content;
                    }
                })
            );
        };
    });

    return (
        <div>
            <Navbar />
            <Box p={2}>
                {stations.map((station, index) => (
                    <Box
                        key={station._id}
                        bgcolor={palette.primary.main}
                        color={palette.primary.contrastText}
                        mb={2}
                    >
                        <h2>{station.name}</h2>
                        <p>
                            <b>Surface:</b> {station.surface}
                        </p>
                        <p>
                            <b>Connections:</b>: dodelat dalsi connections !
                        </p>
                        <p>
                            <b>Info Board Content: </b>
                            {station.info_board_id && (
                                <span>
                                    {fetchInfoBoardContent(
                                        station.info_board_id
                                    )}
                                </span>
                            )}
                        </p>
                    </Box>
                ))}
            </Box>

            <Box mb={5}>
                <Footer />
            </Box>
        </div>
    );
};

export default Stations;
