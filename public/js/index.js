console.log("new chaos");

class Chaos {
    agentMan;
    metrics;
    constructor() {

        this.loadConfig();
    }

    loadConfig() {
        fetch('/api/getconfig', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            this.config = data;
            this.agentMan = new AgentMan(this.config);
            this.metrics = new Metrics(this.agentMan, this.config);
            this.agentMan.createAgents();
            this.setup();
        }).catch((err) => {
            console.log('err');
        });
    }

    addAgent(agent) {
        this.agentMan.agents.push(agent);
    }

    setup() {
        this.agentMan.setup();
        this.metrics.setup();
    }
}

const chaos = new Chaos();