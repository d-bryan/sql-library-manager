const express = require('express');
const router = express.Router();
const Books = require('../models').Book;

//Get books listing
router.get('/', (req, res) => {
    Books.findAll()
        .then(books => res.render('index', { books }));
});

//Get new book form
router.get('/new', (req, res) => {
    res.render('new-book');
});


router.post('/new', (req, res) => {
    let { title, author, genre, year } = req.body;

    Books.create({ title, author, genre, year })
        .then(()=> res.render('new-book', {success: "The book is successfuly added to the book list!"}))
        .catch(err => console.log('Error: ' + err));
});

//Get book detail form
router.get('/:id', (req, res) => {
    Books.findByPk(req.params.id)
        .then(book => {res.render('update-book', { book });
    });
});

router.post('/:id', (req, res) => {
    res.render('new-book');
});

router.post('/:id/delete', (req, res) => {
    res.send('deletes a book');
});

module.exports = router;