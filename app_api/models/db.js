const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/rubricDB';

require ('./rubrics');
require ('./users');

// to remind about setting up for production
// if (process.env.NODE_ENV === 'production') {
//     dbURI = 'whereEver this is';
// }


mongoose.connect(dbURI, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

require('./rubrics');
