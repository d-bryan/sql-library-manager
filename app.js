const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('I love you!');
});

app.listen(3000, () => {
    console.log("This application is running on localhos!");
});