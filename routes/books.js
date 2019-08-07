const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db'
  });

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
        .then(() => res.redirect("/books"))
        //Catch reqrired form field error
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                res.render('new-book', {errors: err.errors});
            }
        });
});

//GET search book
router.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();

    Book.findAll({
        where: {
            [Op.or]: [
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('title')),
                    {[Op.like]: '%' + query + '%'},
                ),
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('author')),
                    {[Op.like]: '%' + query + '%'},
                ),
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('genre')),
                    {[Op.like]: '%' + query + '%'},
                ),
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('year')),
                    {[Op.like]: '%' + query + '%'},
                )
            ]
        }
    }).then(books => res.render('index', { books }));
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
        .then(book => res.redirect("/books/" + book.id))
        //Catch reqrired form field error
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                Book.findByPk(req.params.id)
                    .then(book => res.render('update-book', { errors: err.errors, book }));
            }
        });
});

//POST delete book
router.post('/:id/delete', (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => book.destroy())
        .then(() => res.redirect("/books"));
});

module.exports = router;