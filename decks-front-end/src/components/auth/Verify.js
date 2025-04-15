import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function Verify() {
    const navigate = useNavigate();
    const response = await axios.get('http://localhost:8080/verify');

    if (!response.authenticated) {
        navigate('/');
    }
}