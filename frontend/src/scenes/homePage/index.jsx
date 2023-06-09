import React from "react";
import Navbar from "../navbar";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            HomePage
            <h3>If (user.role === "user) Bude tu 3 velky boxy a na vyber</h3>
            <h4>Kupit lístek</h4>
            <h4>Vsechny stanice</h4>
            <h4>Zobrazit propojení stanic (img z drawio)</h4>
        </div>
    );
};

export default HomePage;
