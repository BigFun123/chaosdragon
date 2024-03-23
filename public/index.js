console.log("new chaos");

class Chaos {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.animate();
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(this.animate.bind(this));
    }

    // randomly send text to a url
    /*sendText() {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: 'hello' })
        }).then(response => response.json()).then(data => {
            console.log(data);
        });
    }

    start() {
        setInterval(() => {
            this.sendText();
        }, 1000);
    }*/
}

new Chaos().start();