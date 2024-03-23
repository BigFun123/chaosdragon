class Agent {
    testButton;
    url;
    result;
    active = true;
    buttonTimeout = null;
    counter = 0;
    times = [];
    time = 0;
    lastURL = null;
    constructor(config) {
        this.config = config;
        this.name = config.name;        
        this.nameDiv = document.getElementById('name' + this.name);
        this.testButton = document.getElementById('testbutton' + this.name);
        this.testButton.addEventListener('click', this.test.bind(this));
        
        this.backendButton = document.getElementById('backend' + this.name);
        this.backendButton.checked = this.config.backend;
        this.backendButton.addEventListener('change', (event) => {
            this.config.backend = event.target.checked;
        });

        this.urlinput = document.getElementById('url' + this.name);
        this.lastURL = this.urlinput.value;
        this.result = document.getElementById('result' + this.name);

        // personality select
        this.personalitySelect = document.getElementById('personality' + this.name);
        this.personalitySelect.value = this.config.personality;
        this.personalitySelect.addEventListener('change', (event) => {
            this.config.personality = event.target.value;
        });

        // active button
        this.activeButton = document.getElementById('active' + this.name);
        this.activeButton.addEventListener('click', () => {

            // check checked state
            const checked = this.activeButton.checked;

            if (!checked) {
                this.stop();
                this.activeButton.classList.remove('active');
                this.active = false;
                this.time = 0;
            } else {
                this.start();
                this.activeButton.classList.add('active');
                this.active = true;
            }
        });
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
        if (!this.active) return;
        this.counter++;

        switch (this.config.personality) {
            case "bee":

                if (this.counter % 10 === 0) {
                    this.makeCall();
                }
                break;
            case "monkey":

                if (Math.random() > 0.9) {
                    // create random url params
                    // create 3 random strings
                    const strings = [];
                    for (let i = 0; i < 3; i++) {
                        strings.push(Math.random().toString(36).substring(7));
                    }

                    const values = [];
                    for (let i = 0; i < 3; i++) {
                        values.push(Math.random());
                    }


                    const params = `?${strings[0]}=${values[0]}&${strings[1]}=${values[1]}&${strings[2]}=${values[2]}`;
                    this.makeCall(params);
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

    makeCall(params) {
        if (!this.active) return;

        this.nameDiv.classList.add('active');
        this.result.value = this.counter + "- ";

        const startTimems = new Date().getTime();
        
        // if this is a backend test, send the url to the backend and get the result
        if (this.config.backend) {
            this.urlinput.value = this.config.url + (params ? params : "");
            const eurl = encodeURIComponent(this.config.url + (params ? params : ""));
            this.lastURL = window.location.protocol + "//" + window.location.host + "/api/backendcall?url=" + eurl;
        } else {
            this.lastURL = this.config.url + (params ? params : "")
        }

        fetch(this.lastURL, {
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
            // console.log('done');
            this.setButtonOff();
            const endTime = new Date().getTime();
            this.time = endTime - startTimems + Math.random() * 10;
            this.result.value += " - " + this.time + "ms";
            this.times.push(this.time);
            
        });
    }

    test() {
        this.makeCall();
    }
}