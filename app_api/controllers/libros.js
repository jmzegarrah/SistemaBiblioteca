var mongoose = require('mongoose');
var Vid = mongoose.model('libro');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// insert new libro to database
module.exports.librosCreate = function(req, res) {
    Vid.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        categoria: req.body.categoria,
        cantidad: req.body.cantidad
    }, function(err, libro) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, libro);
        }
    });
};

// get all libros sorted alphabetically ( not really - case sensitive :D )
module.exports.librosListByAlphabetic = function(req, res) { 
    Vid
        .find({}, null, {
            sort: {
                titulo: 1
            }
        }, function(err, libros) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, libros);
            }
        });
};

// get single libro by id
module.exports.librosReadOne = function(req, res) { 
    if (req.params && req.params.libroid) {
        Vid
            .findById(req.params.libroid)
            .exec(function(err, libro) {
                if (!libro) {
                    sendJsonResponse(res, 404, {
                        "message": "libroid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, libro);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No libroid in request"
        });
    }
};

// update existing libro by id
module.exports.librosUpdateOne = function(req, res) {
    if (!req.params.libroid) {
        sendJsonResponse(res, 404, {
            "messsage": "libroid is required"
        });
        return;
    }

    Vid
        .findById(req.params.libroid)
        .exec(
            function(err, libro) {
                if (!libro) {
                    sendJsonResponse(res, 404, {
                        "message": "libroid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                libro.titulo = req.body.titulo;
                libro.autor = req.body.autor;
                libro.editorial= req.body.editorial;
                libro.categoria= req.body.categoria;
                libro.cantidad= req.body.cantidad;
                libro.save(function(err, libro) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, libro);
                    }
                });
            });
};

module.exports.librosDeleteOne = function(req, res) { 
    var libroid = req.params.libroid;
    if (libroid) {
        Vid
            .findByIdAndRemove(libroid)
            .exec(
                function(err, libro) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "no libroid in request"
        });
    }
};
