let MetricsEnabled = false;
const enableMetricsCheckBox = document.getElementById('toggleMetrics');
enableMetricsCheckBox.addEventListener('click', toggleMetrics);

function toggleMetrics() {
    MetricsEnabled = !MetricsEnabled;
}

function updateData() {
    if (!ChaosActive || !MetricsEnabled) return;
//    myChart.data.datasets[0].data = [];
    //myChart.data.labels = [];

    let i=0;
    agents.forEach((agent) => {
        if (i ==0) {
            myChart.data.labels.push(mainCounter);
        }

        const dataset = myChart.data.datasets[i];
        dataset.data.push(agent.time);
        dataset.label = agent.name;
        dataset.tension = 0;
        i++;
        
    });

    myChart.update();
}

setInterval(updateData, 200);