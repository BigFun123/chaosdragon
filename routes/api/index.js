// ejs route for api
//

const router = require('express').Router();

const defaultResponse = { id: 0, name: 'default' };
let counter = 0;

router.get('/', (req, res) => {
    defaultResponse.id = counter++;
    console.log("chaos received");
    res.send(defaultResponse);
});

router.post('/', (req, res) => {
    defaultResponse.id = counter++;
    console.log("chaos received");
    res.send(defaultResponse);
});

router.get('/test', (req, res) => {
    defaultResponse.id = counter++;
    console.log("chaos received");
    res.send(defaultResponse);
});

router.post('/test', (req, res) => {
    defaultResponse.id = counter++;
    console.log("chaos received");
    res.send(defaultResponse);
});

module.exports = router;
