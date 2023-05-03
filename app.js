require("dotenv").config();
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const { client } = require('./db');


const app = express();
app.use(cors());
app.use(express.json());

//It is a middleware for logging, use morgan for logging server requets and responses etc. could be 'dev' or 'tiny' or 'common' 

app.use(morgan('dev'));

// API Router here
const apiRouter = require('./api');

// client.connect();




app.use('/api',apiRouter);

module.exports = app;
