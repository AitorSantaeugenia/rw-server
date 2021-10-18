require('dotenv/config');
require('./db');
require('./config')(app);
const express = require('express');
const app = express();
var cors = require('cors'); //import cors module

// 👇 MIDDLEWARE MISSING
var whitelist = [ 'http://localhost:8000', 'https://reto-web-phones-cli.herokuapp.com/' ]; //white list consumers
var corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	methods: [ 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS' ],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'device-remember-token',
		'Access-Control-Allow-Origin',
		'Origin',
		'Accept'
	]
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

const allRoutes = require('./routes');
app.use('/api', allRoutes);

const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

const phoneRoutes = require('./routes/phone.routes');
app.use('/api', phoneRoutes);

// app.use((req, res, next) => {
//     // If no routes match, send them the React HTML.
//     res.sendFile(__dirname + "/public/index.html");
//   });

// require("./error-handling")(app);

module.exports = app;
