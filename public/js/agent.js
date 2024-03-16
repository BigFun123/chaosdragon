class Agent {
    testButton;
    url;
    result;
    running = false;
    buttonTimeout = null;
    counter = 0;
    times = [];
    time = 0;
    constructor(config) {
        this.config = config;
        this.name = config.name;
        this.personality = config.personality;
        this.nameDiv = document.getElementById('name' + this.name);
        this.testButton = document.getElementById('testbutton' + this.name);
        this.testButton.addEventListener('click', this.test.bind(this));
        this.url = document.getElementById('url' + this.name);
        this.result = document.getElementById('result' + this.name);
    }

    start() {
        console.log("start " + this.name);
    }

    stop() {
        console.log("stop " + this.name);
    }

    setButtonOff() {
        if (this.buttonTimeout) {
            clearTimeout(this.buttonTimeout);
        }
        this.buttonTimeout = setTimeout(() => {
            this.nameDiv.classList.remove('active');
        }, 100);
    }

    run() {
        this.counter++;
        
        switch (this.config.personality) {
            case "bee":

                if (this.counter % 10 === 0) {
                    this.makeCall();
                }
                break;
            case "monkey":

                if (Math.random() > 0.9) {
                    this.makeCall();
                }
                break;
            case "butterfly":

                if (this.counter % 100 === 0) {
                    this.makeCall();
                }
                break;
            case "donkey":

                if (this.counter % 5 === 0) {
                    this.makeCall();
                }
                if (this.counter % 10 === 0) {
                    this.makeCall();
                }
                if (this.counter % 15 === 0) {
                    this.makeCall();
                }
                if (this.counter % 20 === 0) {
                    this.makeCall();
                }
                if (this.counter % 30 === 0) {
                    this.makeCall();
                }
                break;
            case "dragon":

                if (this.counter % 2 === 0) {
                    this.makeCall();
                    this.makeCall();
                    this.makeCall();
                }
                break;
        }
    }

    makeCall() {
        this.nameDiv.classList.add('active');
        this.result.value = this.counter + "- ";

        const startTimems = new Date().getTime();

        fetch(this.config.url, {
            method: this.config.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.config.body)
        }).then(response => {
            this.result.value += response.ok ? "ok " : "ERROR:" + response.status + " " + response.statusText;
            console.log('response');
        }).catch((err) => {
            // convert err to one line
            this.result.value += " " + err.stack.toString().replace(/\n/g, " ");
            console.log('err');
            this.nameDiv.classList.add('error');

        }).finally((result, err) => {
            this.result.value += " - done ";
            console.log('done');
            this.setButtonOff();
            const endTime = new Date().getTime();
            this.time = endTime - startTimems + Math.random() * 10;
            this.result.value += " - " + this.time + "ms";
            this.times.push(this.time);
        });
    }

    test() {
        this.run();
    }
}