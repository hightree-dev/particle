const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const dpr = window.devicePixelRatio;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
canvas.style.padding = '0px';
canvas.style.margin = '0px';

ctx.scale(dpr, dpr);

document.body.style.margin = '0px';
document.body.style.padding = '0px';

document.body.appendChild(canvas);

class Particle {
    constructor(x, y, r, vx, vy, color = 'black') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = 0; i < Math.random() * 10 + 5; ++i)
    {
        const r = parseInt(Math.random() * 255);
        const g = parseInt(Math.random() * 255);
        const b = parseInt(Math.random() * 255);
        particles.push(new Particle(mouseX, mouseY, Math.random() * 2.5 + 2.5, Math.random() * 10 - 5, Math.random() * 10 - 5, `rgb(${r},${g},${b})`));
    }
        
}

window.onresize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
};

const particles = []


function animate()
{   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Click!', width / 2, height / 2);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    for (let i = 0; i < particles.length; ++i)
    {
        const x = particles[i].x;
        const y = particles[i].y;

        if (x < 0 || y < 0 || x > width || y > height)
            particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
}

animate();