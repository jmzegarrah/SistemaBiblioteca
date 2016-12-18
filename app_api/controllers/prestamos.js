var mongoose = require('mongoose');
var Vid = mongoose.model('prestamo');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// insert new prestamo to database
module.exports.prestamosCreate = function(req, res) {
    Vid.create({
        codigo: req.body.codigo,
        usuario: req.body.usuario,
        libro: req.body.libro,
        fechasalida: req.body.fechasalida,
        fechadevolucion: req.body.fechadevolucion,
        estado: req.body.estado
    }, function(err, prestamo) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, prestamo);
        }
    });
};

// get all prestamos sorted alphabetically ( not really - case sensitive :D )
module.exports.prestamosListByAlphabetic = function(req, res) { 
    Vid
        .find({}, null, {
            sort: {
                titulo: 1
            }
        }, function(err, prestamos) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, prestamos);
            }
        });
};

// get single prestamo by id
module.exports.prestamosReadOne = function(req, res) { 
    if (req.params && req.params.prestamoid) {
        Vid
            .findById(req.params.prestamoid)
            .exec(function(err, prestamo) {
                if (!prestamo) {
                    sendJsonResponse(res, 404, {
                        "message": "prestamoid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, prestamo);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No prestamoid in request"
        });
    }
};

// update existing prestamo by id
module.exports.prestamosUpdateOne = function(req, res) {
    if (!req.params.prestamoid) {
        sendJsonResponse(res, 404, {
            "messsage": "prestamoid is required"
        });
        return;
    }

    Vid
        .findById(req.params.prestamoid)
        .exec(
            function(err, prestamo) {
                if (!prestamo) {
                    sendJsonResponse(res, 404, {
                        "message": "prestamoid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                prestamo.codigo= req.body.codigo;
                prestamo.usuario= req.body.usuario;
                prestamo.libro= req.body.libro;
                prestamo.fechasalida= req.body.fechasalida;
                prestamo.fechadevolucion= req.body.fechadevolucion;
                prestamo.estado= req.body.estado;
                prestamo.save(function(err, prestamo) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, prestamo);
                    }
                });
            });
};

module.exports.prestamosDeleteOne = function(req, res) { 
    var prestamoid = req.params.prestamoid;
    if (prestamoid) {
        Vid
            .findByIdAndRemove(prestamoid)
            .exec(
                function(err, prestamo) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "no prestamoid in request"
        });
    }
};
