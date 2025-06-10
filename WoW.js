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


let mouseX = -1000;
let mouseY = -1000;

canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}


class Particle {
    constructor(x, y, r, color = 'black') {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    update() {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        this.r = Math.max(25 - 0.1 * distance, 5);
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
const row = 10;
const col = row * width / height;
for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
        const x = (width / col) * (j + 0.5);
        const y = (height / row) * (i + 0.5);
        particles.push(new Particle(x, y, 1));
    }
}
    

particles.forEach(p => p.draw(ctx));


function animate()
{   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    })
    requestAnimationFrame(animate);
}

animate();