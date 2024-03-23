let MetricsEnabled = true;
const enableMetricsCheckBox = document.getElementById('toggleMetrics');
enableMetricsCheckBox.addEventListener('click', toggleMetrics);

const numItems = 100;

function toggleMetrics() {
    MetricsEnabled = !MetricsEnabled;
}

function updateData() {
    if (!MetricsEnabled) return;
    //    myChart.data.datasets[0].data = [];
    //myChart.data.labels = [];


    for (let i = 0; i < agents.length+1; i++) {
        while (myChart.data.datasets[i].data.length > numItems) {
            myChart.data.datasets[i].data.shift();
        }
    }

    while (myChart.data.labels.length > numItems) {
        myChart.data.labels.shift();
    }


    const memorydata = myChart.data.datasets[0];

    memorydata.data.push(process.memory.heapUsed );
    memorydata.label = 'heapUsed';
    memorydata.tension = 0;
    myChart.data.labels.push(mainCounter);
    

    let dataset = null
    for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        dataset = myChart.data.datasets[i + 1];
        dataset.data.push(agent.time);
        dataset.label = agent.name;
        dataset.tension = 0;
    };

    myChart.update();
    setTimeout(updateData, timerTime);
}

setTimeout(updateData, timerTime);