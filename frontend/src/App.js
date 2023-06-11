import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import Stations from "./scenes/stations/stations";

function App() {
    //const isAuth = Boolean(useSelector((state) => state.token));
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const isAuth = Boolean(
        useSelector((state) => {
            //console.log("state.token value:", state.token); // Add this line to log the value of state.token
            //console.log("isAuth value:", isAuth);
            return state.token;
        })
    );

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
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
