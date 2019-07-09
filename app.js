//Constant variables to load modules
const express = require('express');

//Create a Express application
const app = express();

//Set routes
app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/books', (req, res) => {
    res.send('shows book list');
});

app.get('/books/new', (req, res) => {
    res.send('shows a new book form');
});

app.post('/books/new', (req, res) => {
    res.send('posts a new book');
});

app.get('/books/:id', (req, res) => {
    res.send('shows book detail page');
});

app.post('/books/:id', (req, res) => {
    res.send('updates a book detail');
});

app.post('/books/:id/delete', (req, res) => {
    res.send('deletes a book');
});

app.listen(3000, () => {
    console.log("This application is running on localhost:3000!");
});