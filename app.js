//Constant variables to load modules
const express = require('express');
const bodyParser = require('body-parser');

//Create a Express application
const app = express();

//Serve static file
app.use('/static', express.static('public'));

//Add URL-encoded parser
app.use(bodyParser.urlencoded({ extended: false }))

//Set Pug to template engine
app.set('view engine', 'pug');

//Set books routes
app.use('/books', require('./routes/books'));

//Set routes
app.get('/', (req, res) => {
    res.redirect('/books');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`This application is running on port ${PORT}!`);
});