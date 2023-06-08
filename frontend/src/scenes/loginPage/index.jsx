import React from "react";
import Navbar from "../navbar";

const LoginPage = () => {
    return (
        <div>
            <Navbar />
            LoginPage
        </div>
    );
};

export default LoginPage;

/*
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

function LogoutButton() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the setLogout action to clear the token
        dispatch(setLogout());
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;

*/
