import axios from "axios";
import { useNavigation } from "react-router-dom";

export default function LoginButton() {
    return (
        <button onClick={Login}>Login with Spotify</button>
    );
}

export async function Login() {
    try {
        const response = await axios.get('http://localhost:8080/login');
        console.log(response.data);
    } catch(error) {
        console.log('uh oh');
    }
}