import axios from "axios";
import { useState, useEffect } from "react";

function LandingPage() {
    const [message, setMessage] = useState('');
  
    useEffect (() => {
      const connectBackend = async () => {
        const response = await axios.get('http://localhost:8080/');
        setMessage(response.data);
      }
      connectBackend();
    }, []);
  
    return (
        <div>
            <h1>This is On The Decks. A comprehensive breakdown of your music this year!</h1>
            <p>{message}</p>
        </div>
    );
  }

export default LandingPage;