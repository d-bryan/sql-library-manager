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

//Set up a middleware function to handle 404 error
app.use((req, res, next) => {
        if(!req.route){
            res.status(404).render('page-not-found');
        }
    });

//Set up middleware functions for server errors
app.use(function (err, req, res, next) {
    console.log('Error: ' + err.message);
    res.render('error');
});

//Set Home route
app.get('/', (req, res) => {
    res.redirect('/books');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`This application is running on port ${PORT}!`);
});