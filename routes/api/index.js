// ejs route for api
//
const { Worker } = require('worker_threads');
const worker = new Worker('./routes/api/worker.js');

const router = require('express').Router();

const defaultResponse = { id: 0, name: 'default' };
let counter = 0;

router.get('/getconfig', (req, res) => {
    const config = require("../../config.json");
    res.send(config);
});

router.get('/', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    res.send(defaultResponse);
});

router.post('/', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    res.send(defaultResponse);
});

router.get('/test', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    res.send(defaultResponse);
});

router.get('/testdelay', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    setTimeout(() => {
        res.send(defaultResponse);
    }, Math.random() * 1000);
});

router.post('/testdelay', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    setTimeout(() => {
        res.send(defaultResponse);
    }, Math.random() * 1000);
});


router.post('/test', (req, res) => {
    defaultResponse.id = counter++;
    // console.log("chaos received");
    res.send(defaultResponse);
});

router.get('/backendcall', (req, res) => {
    defaultResponse.id = counter++;

    worker.postMessage({ id: defaultResponse.id, url: req.query.url });
    worker.on('message', (data) => {
        //console.log(data);
        //res.send(data);
    });
    worker.on('error', (error) => {
        console.error(error);
        //res.send({ error: true });
    });
    worker.on('exit', (code) => {
        console.log("exit");
        //res.send({ error: true });
    });
    res.send({ error: false });
    /*
    defaultResponse.id = counter++;
    //console.log("chaos received");
    const url = req.query.url;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
        */
});

module.exports = router;
