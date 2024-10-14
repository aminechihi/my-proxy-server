const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    request('https://gam.onl', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const modifiedBody = body.replace(/<script[^>]*src="https:\/\/cse\.google\.com\/adsense\/search\/async-ads\.js"[^>]*><\/script>/g, '');
            res.send(modifiedBody);
        } else {
            res.status(500).send('Error fetching the page');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
