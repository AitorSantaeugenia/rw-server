require('dotenv/config');
require('./db');
require('./config')(app);
const express = require('express');
const app = express();

// 👇 MIDDLEWARE MISSING
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

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
