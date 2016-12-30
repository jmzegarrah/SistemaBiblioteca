var mongoose = require('mongoose');
require('./libros.model');
require('./users.model');
require('./prestamos.model');
// create Mongoose connection to local db
var dbURI = 'mongodb://root:soloporti29@ds021326.mlab.com:21326/bibliotecaunsa';
//var dbURI = 'mongodb://localhost/vidzy';

mongoose.connect(dbURI);

// logging
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// db disconnect
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// connection management

// nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// interrupt signal
process.on('SIGINT', function() {
    gracefulShutdown('SIGINT received', function() {
        process.exit(0);
    });
});

// termination signal
process.on('SIGTERM', function() {
    gracefulShutdown('SIGTERM received', function() {
        process.exit(0);
    });
});
