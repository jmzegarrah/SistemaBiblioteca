var mongoose = require('mongoose');
var prestamoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    libro: {
        type: String,
        required: true
    },
    fechasalida: {
        type: String,
        required: true
    },
    fechadevolucion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

// mongoose automatically looks for plural of model's name in db collection
// last parameter is thus redundant
mongoose.model('prestamo', prestamoSchema, 'prestamos');
