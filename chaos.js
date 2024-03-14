// create an express site
var express = require('express');
const router = express.Router();
var app = express();

app.use(express.json());


//const indexRoute = require('./routes/index');
app.use('/', require('./routes/index'));
app.use('/config', require('./routes/config/index'));
app.use('/api', require('./routes/api/index'));
app.use('/telemetry', require('./routes/telemetry/index'));
//router.use('/routes/api', require('./routes/api'));
//router.use('/routes/config', require('./routes/config'));


// set up the view engine
app.set('view engine', 'ejs');

// set views folder
app.set('views', 'views');

// set up the public directory
app.use(express.static('public'));

// start the server

app.listen(3000, function() {
    console.log('Listening on port 3000');
    });
