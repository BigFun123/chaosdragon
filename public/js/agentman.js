class AgentMan {
    timerTime = 1000;
    agents = [];
    AutoPilotTimer = null;
    ChaosActive = false;
    MainFrequency = 50;
    mainCounter = 0;

    constructor(config) {
        this.config = config;
    }

    setup() {
        this.autoPilotButton = document.getElementById('autoPilotButton');
        this.autoPilotButton.addEventListener('click', () => {
            if (this.ChaosActive) {
                this.autoPilotButton.classList.remove('active');
                this.ChaosActive = false;
                clearTimeout(this.AutoPilotTimer);
            } else {
                this.autoPilotButton.classList.add('active');
                this.ChaosActive = true;
                this.AutoPilotTimer = setTimeout(()=>this.runAll(), this.timerTime);                
            }
        });

        const MainFrequencyDiv = document.getElementById('agentFrequency');
        MainFrequencyDiv.oninput =  () => {
            this.MainFrequency = MainFrequencyDiv.value;
            frequencyValue.value = this.MainFrequency;
            this.timerTime = 1000 - this.MainFrequency + 1;
            console.log("new timerTime: " + this.timerTime);
        };

        const frequencyValue = document.getElementById('frequencyValue');
        MainFrequencyDiv.value = this.MainFrequency;
        frequencyValue.innerHTML = this.MainFrequency;
        
    }

    createAgents() {
        this.agents = [];
        this.config.agents.forEach((agent) => {
            this.agents.push(new Agent(agent));
        });
    }

    saveConfig() {
        this.config.active = this.active;

        fetch('/saveconfig', {
            mode: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.config)
        }).then(response => {
            this.result.value += response.ok ? "ok " : "ERROR:" + response.status + " " + response.statusText;
            console.log('response');
        }).catch((err) => {
            // convert err to one line
            this.result.value += " " + err.stack.toString().replace(/\n/g, " ");
            console.log('err');
            this.nameDiv.classList.add('error');
        });
    }

    runAll() {
        this.mainCounter++;
        this.agents.forEach((agent) => {
            if (agent.active) {
                agent.run();
            }
        });
        this.AutoPilotTimer = setTimeout(()=>this.runAll(), this.timerTime);
    }
}
