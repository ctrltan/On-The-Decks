import axios from "axios";
import { useNavigation } from "react-router-dom";

export default function LoginButton() {
    return (
        <button onClick={login}>Login with Spotify</button>
    );
}

const login = async () => {
    try {
        window.location.href = 'http://localhost:8080/login';
    } catch(error) {
        console.log('uh oh');
    }
};
