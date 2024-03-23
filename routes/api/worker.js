// make a call to an endpoint

// get the paremeter from the worker 
const { workerData, parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
    //console.log(data);
    //parentPort.postMessage({ success: true });
    const url = data.url;
    fetch(url)
        .then(res => res.json())
        .then((data) => {            
            parentPort.postMessage({ success: true });
        })
        .catch((err) => {
            parentPort.postMessage({ success: false });
        });
});

