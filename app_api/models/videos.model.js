var mongoose = require('mongoose');
var libroSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// mongoose automatically looks for plural of model's name in db collection
// last parameter is thus redundant
mongoose.model('Libro', libroSchema, 'libros');
