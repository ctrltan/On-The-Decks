import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Verify() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true);

    console.log('frontend verification...');
    useEffect(() => {
        const verifyUser = async () => {
            const response = await axios.get('http://localhost:8080/verify', {
                withCredentials: true,
            });

            if (!response.data.authenticated) {
                setIsAuth(false);
            }
        };
        verifyUser();
    }, [isAuth]);

    if (isAuth) {
        return (
            <>
            <Outlet />
            </>
        );
    } else {
        navigate('/');
    }
}