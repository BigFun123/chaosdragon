let agents = [];
let ChaosActive = false;
const autoPilotButton = document.getElementById('autoPilotButton');
let AutoPilotTimer = null;
let mainCounter = 0;

autoPilotButton.addEventListener('click', () => {
    if (ChaosActive) {
        autoPilotButton.classList.remove('active');
        ChaosActive = false;
        clearInterval(AutoPilotTimer);
    } else {
        autoPilotButton.classList.add('active');
        ChaosActive = true;
        AutoPilotTimer = setInterval(runAll, 100);
    }
});


function runAll() {
    mainCounter++;
    agents.forEach((agent) => {
        agent.run();
    });
}    