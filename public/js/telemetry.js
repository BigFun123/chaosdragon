class Metrics {
    MetricsEnabled = true;
    numItems = 100;
    
    constructor(agentman) {
        this.agentman = agentman;
        this.name = 'Metrics';
        this.time = 0;
    }

    setup() {
        const enableMetricsCheckBox = document.getElementById('toggleMetrics');
        enableMetricsCheckBox.addEventListener('click', this.toggleMetrics);
        this.setupChart();
        this.start();
    }

    toggleMetrics() {
        this.MetricsEnabled = !this.MetricsEnabled;
    }

    updateData() {
        if (!this.MetricsEnabled) return;

        for (let i = 0; i < this.agentman.agents.length + 1; i++) {
            while (this.chart.data.datasets[i].data.length > this.numItems) {
                this.chart.data.datasets[i].data.shift();
            }
        }

        while (this.chart.data.labels.length > this.numItems) {
            this.chart.data.labels.shift();
        }


        const memorydata = this.chart.data.datasets[0];

        memorydata.data.push(process.memory.heapUsed);
        memorydata.label = 'heapUsed';
        memorydata.tension = 0;
        this.chart.data.labels.push(this.agentman.mainCounter);


        let dataset = null
        for (let i = 0; i < this.agentman.agents.length; i++) {
            const agent = this.agentman.agents[i];
            dataset = this.chart.data.datasets[i + 1];
            dataset.data.push(agent.time);
            dataset.label = agent.name;
            dataset.tension = 0;
        };

        this.chart.update();
        this.start();
    }

    setupChart() {
        var ctx = document.getElementById("chaosChart").getContext("2d");
        ctx.canvas.width = 300;
        ctx.canvas.height = 80;

        const xValues = [];
        const yValues = [0, 0];
        this.chart = new Chart("chaosChart", {
            type: "line",
            bezierCurve: false,
            color: 'white',
            data: {
                labels: xValues,
                datasets: [{
                    data: [],
                    borderColor: "red",
                    fill: false,
                    label: "c",
                    tension: 0,
                    cubicInterpolationMode: 'default',
                    linewidth: 1,
                    color: 'white'
                },
                {
                    data: [],
                    borderColor: "green",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "blue",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "orange",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "purple",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "#55F",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "black",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "pink",
                    fill: false,
                    label: "c",
                    lineTension: 0,
                    cubicInterpolationMode: 'default'
                },
                {
                    data: [],
                    borderColor: "ltblue",
                    fill: false,
                    label: "c",
                    cubicInterpolationMode: 'default',
                    lineTension: 0,
                }]
            },
            options: {}
        });
    }

    start() {
        setTimeout(() => this.updateData(), this.agentman.timerTime);
    }
}





