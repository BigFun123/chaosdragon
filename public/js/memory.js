let process = {
    memory : {
        external:0,
        heapUsed: 0,
        heapTotal:0,
        rss:0,
        arrayBuffers:0,
    }
};

setInterval(updateMemory, 2000);

function updateMemory() {
    fetch('/telemetry/memory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((data) => {
        const memory = data.memory;
        process.memory = memory;
        // convert all units from bytes to MB
        process.memory.rss = Math.round(memory.rss / 1024 / 1024);
        process.memory.heapTotal = Math.round(memory.heapTotal / 1024 / 1024);
        process.memory.heapUsed = Math.round(memory.heapUsed / 1024 / 1024);
        process.memory.external = Math.round(memory.external / 1024 / 1024);

        const memoryDiv = document.getElementById('memory');
        memoryDiv.innerHTML = `rss: ${memory.rss}MB | heapTotal: ${memory.heapTotal}MB | heapUsed: ${memory.heapUsed}MB | external: ${memory.external}MB`;
    });
}