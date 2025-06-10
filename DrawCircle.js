const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const dpr = window.devicePixelRatio;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
canvas.style.border = '1px solid black';

ctx.scale(dpr, dpr);

document.body.style.margin = '0px';
document.body.appendChild(canvas);

class Particle {
    constructor(x, y, r, color = 'black') {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

window.onresize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    particles.forEach(p => p.draw(ctx));
};

const particles = [];
for (let i = 0; i < 100; ++i)
    particles.push(new Particle(Math.random() * width, 
                                Math.random() * height,
                                Math.random() * 5));

particles.forEach(p => p.draw(ctx));
