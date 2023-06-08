import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import { useSelector } from "react-redux";

function App() {
    //const isAuth = Boolean(useSelector((state) => state.token));

    const isAuth = Boolean(
        useSelector((state) => {
            //  console.log("state.token value:", state.token); // Add this line to log the value of state.token
            // console.log("isAuth value:", isAuth);
            return state.token;
        })
    );

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route
                        path="/home"
                        element={isAuth ? <HomePage /> : <Navigate to="/" />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
