var mongoose = require('mongoose');
var libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
});

// mongoose automatically looks for plural of model's name in db collection
// last parameter is thus redundant
mongoose.model('libro', libroSchema, 'libros');
