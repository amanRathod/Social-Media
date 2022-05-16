/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const ConnectDB = require('./config/db');

const OS = require('os');
const numCpu = OS.cpus().length;
process.env.UV_THREADPOOL_SIZE = numCpu;

const app = express();

dotenv.config();

ConnectDB();

// middleware
app.use(helmet());
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', {
    skip: function(_req, res) { return res.statusCode < 400; },
    stream: process.stderr,
  }));
  console.log = () => {};
}

app.use('/', require('./routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

module.exports = app;
