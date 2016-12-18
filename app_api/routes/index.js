var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlLibros = require('../controllers/libros');
var ctrlPrestamos = require('../controllers/prestamos');
var ctrlAuth = require('../controllers/authentication');

// CRUD operations

// CRUD Libros
router.post('/libros', auth, ctrlLibros.librosCreate);
router.get('/libros', ctrlLibros.librosListByAlphabetic);
router.get('/libros/:libroid', ctrlLibros.librosReadOne);
router.put('/libros/:libroid', auth, ctrlLibros.librosUpdateOne);
router.delete('/libros/:libroid', auth, ctrlLibros.librosDeleteOne);

//CRUD prestamos
router.post('/prestamos', auth, ctrlPrestamos.prestamosCreate);
router.get('/prestamos', ctrlPrestamos.prestamosListByAlphabetic);
router.get('/prestamos/:prestamoid', ctrlPrestamos.prestamosReadOne);
router.put('/prestamos/:prestamoid', auth, ctrlPrestamos.prestamosUpdateOne);
router.delete('/prestamos/:prestamoid', auth, ctrlPrestamos.prestamosDeleteOne);

// auth routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
