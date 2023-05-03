require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const client = require("./db/client");
client.connect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//It is a middleware for logging, use morgan for logging server requets and responses etc. could be 'dev' or 'tiny' or 'common'

// API Router here
const apiRouter = require("./api");

app.use("/api", apiRouter);

module.exports = app;
