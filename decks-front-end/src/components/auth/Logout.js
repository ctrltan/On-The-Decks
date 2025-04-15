import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    return (
        <button onClick={logout}>Logout</button>
    );
}

const logout = async () => {
    try {
        window.location.href = 'http://localhost:8080/logout';
    } catch(error) {
        console.log('uh oh');
    }
};