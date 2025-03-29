import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function LandingPage() {
    const location = useLocation();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resMessage = params.get(message);

        if (resMessage) {
            setMessage(resMessage);
        }
    }, [location]);

    return (
        <div>
            <h1>This is On The Decks. A comprehensive breakdown of your music this year!</h1>
            <p>Login to get started</p>
            <p>{ message }</p>
        </div>
    );
  }

export default LandingPage;