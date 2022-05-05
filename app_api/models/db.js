const mongoose = require('mongoose');
let dbURI = 'mongodb://localhost/rubricDB';
// let dbURI = 'mongodb://127.0.0.1:27017/rubricDB';
// let dbURI = 'process.env.MONGODB_URI';
//let dbURI = 'mongodb://mongo:27017/rubricDB';

require ('./rubrics');
require ('./users');

// to remind about setting up for production
// if (process.env.NODE_ENV === 'production') {
//     dbURI = 'mongodb://mongo:27017/rubricDB';
// }
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
}

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
