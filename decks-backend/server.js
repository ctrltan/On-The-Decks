require('dotenv').config()
const crypto = require('crypto')
const express = require('express')
const axios = require('axios')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { access } = require('fs')
const { default: Verify } = require('./auth/verify')

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());

const REDIRECT_URI = 'http://localhost:3000/callback'
const PORT = 8080

app.get('/', (req, res) => {
    res.send('NodeJS backend works');
});

app.get('/login', (req, res) => {
    try {
        const state = crypto.randomBytes(16).toString('hex');
        const scope = 'user-read-private playlist-read-private playlist-read-collaborative user-top-read user-library-read';

        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`);
    } catch(error) {
        console.error("Spotify Login Failed", error);
        const message = encodeURIComponent('Sorry! We could not log you in at this moment');
        res.redirect(`http://localhost:3000?status=failure&message=${message}`);
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.redirect('http://localhost:3000/');
});

app.post('/callback', async (req, res) => {
    try {
        const state = req.body.state || null
        const auth_code = req.body.code || null

        if (!state || !auth_code) {
            throw 500;
        }

        const params = new URLSearchParams();
        params.append('code', auth_code);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('grant_type', 'authorization_code');

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
            },
        });

        const { access_token, refresh_token } = response.data;


        res.cookie('access_token', access_token, {
            'httpOnly': true,
            'secure': false,
            'sameSite': 'lax',
            'maxAge': 3600000,
        });

        res.cookie('refresh_token', refresh_token, {
            'httpOnly': true,
            'secure': false,
            'sameSite': 'lax',
            'maxAge': 2629476000,
        });

        const message = encodeURIComponent('It worked!');
        res.send({ status: 'success' });
    } catch(error) {
        console.error("Callback Failed", error);
        res.status(500).send({ status: 'failure', message: 'Sorry! We could not log you in at this moment' });
    }
});

app.get('/verify', async (req, res) => {
    const access_cookie = req.cookies['access_token'];
    const refresh_cookie = req.cookies['refresh_token'];
    
    if (access_cookie) {
        res.send({ authenticated: true });
    } else if (refresh_cookie) {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refresh_cookie);
        params.append('client_id', process.env.CLIENT_ID);

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        res.send({ authenticated: true });
    } else {
        res.send({ authenticated: false });
    }
});

app.listen(PORT, () => {
    console.log('server listening on port 8080')
})