const mongoose = require('mongoose');
require('dotenv').config();

// original
// let url = 'mongodb://localhost/rubricDB';
// let url = process.env.DB_URI;

// doesn't crash, can access express, but still no db
//let url = `mongodb://root:123456@$localhost:27017/rubricDB?authSource=admin`;



const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const host = process.env.MONGODB_HOST;
let url =
    `mongodb+srv://${username}:${password}@${host}/${cluster}?retryWrites=true&w=majority`;


require ('./rubrics');
require ('./users');


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


// works
mongoose.connect(url, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${url}`);
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

module.exports = {
    url
};