requiure('dotenv').config()
const crypto = require('crypto')
const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())

const REDIRECT_URI = 'http://localhost:8080/callback'
const PORT = 8080

app.get('/', (req, res) => {
    res.send('NodeJS backend works');
});

app.get('/login', (req, res) => {
    try {
        const state = crypto.randomBytes(16).toString('hex');
        const scope = 'user-read-private playlist-read-private playlist-read-collaborative user-top-read user-library-read';

        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}&state=${state}`);
    } catch(error) {
        console.error("Spotify Login Failed", error);
        res.status(500).json({ success: false, message: 'Sorry! We could not log you in at the moment' });
    }
});

app.get('/callback', async (req, res) => {
    try {
        const state = req.query.state || null
        const auth_code = req.query.code || null

        if (state === null) {
            throw 500;
        } else {
            
        }
    } catch(error) {
        res.redirect();
    }
});

app.listen(PORT, () => {
    console.log('server listening on port 8080')
})