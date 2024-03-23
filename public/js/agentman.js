let timerTime = 1000;

let agents = [];
let ChaosActive = false;
const autoPilotButton = document.getElementById('autoPilotButton');
let AutoPilotTimer = null;

let MainFrequency = 50;
const MainFrequencyDiv = document.getElementById('agentFrequency');
MainFrequencyDiv.oninput = function () {
    MainFrequency = MainFrequencyDiv.value;
    frequencyValue.value = MainFrequency;
    timerTime = 1000 - MainFrequency + 1;
    console.log("new timerTime: " + timerTime);
};

const frequencyValue = document.getElementById('frequencyValue');
MainFrequencyDiv.value = MainFrequency;
frequencyValue.innerHTML = MainFrequency;

let mainCounter = 0;


autoPilotButton.addEventListener('click', () => {
    if (ChaosActive) {
        autoPilotButton.classList.remove('active');
        ChaosActive = false;
        clearTimeout(AutoPilotTimer);
    } else {
        autoPilotButton.classList.add('active');
        ChaosActive = true;
        AutoPilotTimer = setTimeout(runAll, timerTime);
    }
});


function runAll() {
    mainCounter++;
    agents.forEach((agent) => {
        if (agent.active) {
            agent.run();
        }
    });
    AutoPilotTimer = setTimeout(runAll, timerTime);
}

function saveConfig() {
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