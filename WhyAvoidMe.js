const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;
const dpr = window.devicePixelRatio;

canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
ctx.scale(dpr, dpr);
document.body.style.margin = '0px';
document.body.appendChild(canvas);

let mouseX = -10000;
let mouseY = -10000;
canvas.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

class Particle {
    constructor(x, y) {
        this.ox = x;
        this.oy = y;
        this.x = x;
        this.y = y;
    }

    update() {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50) {
            const repelStrength = 100 / (dist + 1);
            this.x += dx / dist * repelStrength;
            this.y += dy / dist * repelStrength;
        } else {
            this.x += (this.ox - this.x) * 0.05;
            this.y += (this.oy - this.y) * 0.05;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const spacing = 8;
const particles = [];
for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'black';

    for (let p of particles) {
        p.update();
        p.draw(ctx);
    }

    requestAnimationFrame(animate);
}
animate();