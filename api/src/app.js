const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const path = require('path');


// require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
// server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use(express.static(path.join(__dirname, 'dbImages')));
server.use(cors({ credentials: true, origin: "*" }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

// https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901
// https://api.thedogapi.com/v1/breeds/search?q={working}?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901

