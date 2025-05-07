import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Callback() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const code = params.get('code');
    
    const sent = useRef(false);
    sent.current = false;

    useEffect(() => {
        const performCallback = async () => {
            try {
                if (state && code && !sent.current) {
                    console.log('running...');
                    sent.current = true;
                    const response = await axios.post('http://localhost:8080/callback', { state, code }, { withCredentials: true });
                    const data = response.data;
                    setMessage(data);
                } else {
                    throw 500;
                }
            } catch(error) {
                setMessage(error.data);
            }
        };
        performCallback();
        console.log("success");
        navigate('/');
    }, []);
}