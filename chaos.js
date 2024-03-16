// create an express site
const config = require("./config.json");

var express = require('express');
const router = express.Router();
var app = express();

app.use(express.json());




//const indexRoute = require('./routes/index');
app.use('/', require('./routes/index'));
app.use('/config', require('./routes/config'));
app.use('/api', require('./routes/api/'));
app.use('/chaos', require('./routes/chaos'));
app.use('/telemetry', require('./routes/telemetry'));
//router.use('/routes/api', require('./routes/api'));
//router.use('/routes/config', require('./routes/config'));
app.disable('view cache');

// set up the view engine
app.set('view engine', 'ejs');

// set views folder
app.set('views', 'views');

// set up the public directory
app.use(express.static('public'));

// start the server

app.listen(config.admin.port || 3777, function() {
    console.log(`Listening on port ${config.admin.host}:${config.admin.port}`);
    });
