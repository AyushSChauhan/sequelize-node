const express = require('express');
const app = express()
const passport = require('passport');

const session = require('express-session');
require('dotenv').config();


const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })); 
require('./app/helpers/authPassport')(passport);
app.use(express.static('./app/upload'));
app.use(express.json())

const db = require('./app/dbConnection/db');


app.use('/', require('./app/routes/userRoute'))
app.use('/', require('./app/routes/addressBookRoute'))


const logger = require('./app/loggers/logger')
app.use(require("./app/middleware/response"));
app.use(require("./app/middleware/error").handleJoiErrors);
app.use(require("./app/middleware/error").handleErrors);

const port = process.env.PORT || 3000;


app.listen(port, () => logger.info(`Listening on port ${port}`));