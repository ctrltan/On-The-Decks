require('dotenv').config()
const crypto = require('crypto')
const express = require('express')
const axios = require('axios')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { access } = require('fs')

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(cookieParser())

const REDIRECT_URI = 'http://localhost:8080/callback'
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

app.get('/callback', async (req, res) => {
    try {
        const state = req.query.state || null
        const auth_code = req.query.code || null

        if (state === null || auth_code === null) {
            throw 500;
        }

        const params = new URLSearchParams();
        params.append('code', auth_code);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('grant_type', 'authorization_code');

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content_Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
                'Access-Control-Allow-Origin': '*',
            },
        });

        const { access_token, refresh_token } = response.data;

        res.cookie('access_token', access_token, {
            'httpOnly': true,
            'secure': false,
            'sameSite': 'strict',
            'maxAge': 3600000,
        });

        res.cookie('refresh_token', refresh_token, {
            'httpOnly': true,
            'secure': false,
            'sameSite': 'strict',
            'maxAge': 2629476000,
        });

        const message = encodeURIComponent('It worked!');
        res.redirect(`http://localhost:3000?status=success&message=${message}`);
    } catch(error) {
        console.error("Callback Failed", error);
        const message = encodeURIComponent('Sorry! We could not log you in at this moment');
        res.redirect(`http://localhost:3000?status=failure&message=${message}`);
    }
});

app.listen(PORT, () => {
    console.log('server listening on port 8080')
})