import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function HomePage() {
    const [data, setData] = useState('');
    useEffect(() => {
        const obtainData = async () => {
            const result = getData();
        };
        obtainData();
    }, []);

    return (
        <div>
            <h1>Hi</h1>
            <p>Ayee! you're authenticated</p>
        </div>
    );
}

const getData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/top-tracks', { withCredentials: true });
        console.log(response.data);

    } catch (error) {
        console.log(error);
    }
};

