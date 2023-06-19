import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Stations from "./scenes/stations/index.js";
import MyTickets from "./scenes/myTickets";
import CreateTicket from "./scenes/createTicket";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const user = useSelector((state) => state.user);
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />

                        <Route
                            path="/home"
                            element={
                                isAuth ? <HomePage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/stations"
                            element={
                                isAuth ? <Stations /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path={`/users/:id/tickets`}
                            element={
                                isAuth ? <MyTickets /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path={`/tickets`}
                            element={
                                isAuth ? <CreateTicket /> : <Navigate to="/" />
                            }
                        />
                        {/* Fallback for invalid routes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
