import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Verify() {
    const navigate = useNavigate();
    console.log('frontend verification...');
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

    return (
        <>
        <Outlet />
        </>
    );
}