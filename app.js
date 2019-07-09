//Constant variables to load modules
const express = require('express');

//Create a Express application
const app = express();

app.use('/static', express.static('public'));

//Set Pug to template engine
app.set('view engine', 'pug');

//Set routes
app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    res.render('index');
});

app.get('/books/new', (req, res) => {
    res.render('new-book');
});

app.post('/books/new', (req, res) => {
    res.render('new-book');
});

app.get('/books/:id', (req, res) => {
    res.render('new-book');
});

app.post('/books/:id', (req, res) => {
    res.render('new-book');
});

app.post('/books/:id/delete', (req, res) => {
    res.send('deletes a book');
});

app.listen(3000, () => {
    console.log("This application is running on localhost:3000!");
});