import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verify() {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            const response = await axios.get('http://localhost:8080/verify', {
                withCredentials: true,
            });

            if (!response.data.authenticated) {
                navigate('/');
            }
        };
        verifyUser();
    }, [navigate]);
}