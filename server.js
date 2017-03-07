'use strict';

var express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

var server = app.listen(5000);