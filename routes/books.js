const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//GET book listing
router.get('/', (req, res) => {
    Book.findAll()
        .then(books => res.render('index', { books }));
});

//GET new book form
router.get('/new', (req, res) => {
    res.render('new-book')
});

//POST create book
router.post('/new', (req, res) => {
    let { title, author, genre, year } = req.body;

    Book.create({ title, author, genre, year })
        .then(()=> res.render('new-book', {success: "The book is successfuly added to the book list!"}));
});

//GET book detail form
router.get('/:id', (req, res) => {
    Book.findByPk(req.params.id)
        .then(book => {
            res.render('update-book', { book });
        });
});

//POST update book
router.post('/:id', (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => book.update(req.body))
        .then(book => res.redirect("/books/" + book.id));
});

//POST delete book
router.post('/:id/delete', (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => book.destroy())
        .then(() => res.redirect("/books"));
});

module.exports = router;