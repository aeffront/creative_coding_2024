import {loadSVGAndExtractPoints} from './JS/svg.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const instructions = document.getElementById('instructions');

class svgShape{
    constructor(path,x,y){
        this.path = path;
        this.points;
        this.insidePoints = [];
        this.x = x || width/2;
        this.y = y || height/2;
        this.extractPoints();
       
    }
    extractPoints(){
        loadSVGAndExtractPoints(this.path).then((points) => {
            this.points = points;
            
            this.offset();
            this.createPath();
            this.insidePoints = this.createInsidePoints();
            insidePoints = [];
            this.insidePoints.forEach((point) => {
                insidePoints.push(point);
            });
            
            
            //console.log(insidePoints);

        });

    }

    offset(){
        this.points.forEach((point) => {
            point[0] += this.x;
            point[1] += this.y;
        });
    }

    createPath(){
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for(let i = 1; i < this.points.length; i++){
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    createInsidePoints(){
        let points = [];
    
        for (let i=0;i<100000;i++){
            let x = Math.random() * width;
            let y = Math.random() * height;
        
            if(ctx.isPointInPath(x, y)){
                points.push({
                    x: x,
                    y: y,
                });
            }
            
        }
        
        return points;
        
    }

    setNewDestination(){
        let destination_point = this.insidePoints[Math.floor(Math.random() * this.insidePoints.length)];
        this.d_pos = new Vector(destination_point.x, destination_point.y);
    }
}

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mult(n){
        return new Vector(this.x * n, this.y * n);
    }
    squareRoot(){
        return new Vector(Math.sqrt(this.x), Math.sqrt(this.y));
    }
    distance(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}

class Particle{
    constructor(o_pos, d_pos){
        this.o_pos = o_pos;
        this.pos = o_pos;
        this.d_pos = d_pos;
        this.speed = (Math.random() * 0.01)+0.005;
        this.a = new Vector(0, 0);
        this.v = new Vector(0, 0);
        this.life = 0;
        this.maxLife = 400+Math.random()*100;
        this.size = 1;
        this.emojis = ['👾', '😀', '😎', '🎉', '🚀', '🌟', '🔥', '💧', '🍀', '🌈'];
        this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
    
    }

    update(){
        
        
        let d = this.d_pos.sub(this.pos);

        if(d.distance() > 10){
            d = d.mult(this.speed);
            this.a = this.a.mult(0.3);
            this.a = this.a.add(d);
        }
        


        //console.log(d);
        
        
        this.v = this.v.add(this.a);
        this.v = this.v.mult(0.8);
        this.pos = this.pos.add(this.v);
        this.life++;

        

        
    }

    show(){
        //ctx.beginPath();
        //ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        //ctx.fill();

        ctx.fillText(this.emoji, this.pos.x, this.pos.y);
    }
}

function createParticles(points,num,x,y){
    let particles = [];
    for(let i = 0; i < num; i++){
        let o_x = x || Math.random() * width;
        let o_y = y || Math.random() * height;
        let o_pos = new Vector(o_x, o_y);
        let destination_point = points[Math.floor(Math.random() * points.length)];
        let d_pos = new Vector(destination_point.x, destination_point.y);
        let p = new Particle(o_pos, d_pos);
        p.v = new Vector(0, 0);
        p.a = new Vector(0, 0);
        particles.push(p);
    }
    return particles;
}

function animate(){
    ctx.clearRect(0, 0, width, height);

    if(keyIsDown && mouseIsDown){
        console.log('key is down');
        particles.forEach((p) => {
            let distance = Math.sqrt((p.pos.x - mousePos.x) * (p.pos.x - mousePos.x) + (p.pos.y - mousePos.y) * (p.pos.y - mousePos.y));
            if(distance < 100){
                p.a = p.a.add(new Vector((p.pos.x - mousePos.x) * 0.0001, (p.pos.y - mousePos.y) * 0.0001).mult(1000));
            }
        });
    }
        
    if(!keyIsDown){
    if(generate && insidePoints.length > 0){
        for(let i = 0; i < 10; i++){
            particles = particles.concat(createParticles(insidePoints, 10,mousePos.x,mousePos.y));
        }
        if(particles.length > 7000){
            let diff = particles.length - 7000;
            particles.splice(0, diff);
        }
       
    }
}

    particles.forEach((p,i) => {

        p.update();
        p.show();
        if(p.life > p.maxLife){
            particles.splice(i, 1);
        }
    });
    requestAnimationFrame(animate);
}

let generate = false;
let mouseIsDown = false;
let mousePos = new Vector(0, 0);

document.addEventListener('mousedown', (e) => {
    instructions.style.display = 'none';
    mouseIsDown = true;
    generate = true;
    mousePos = new Vector(e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
    mousePos = new Vector(e.clientX, e.clientY);
});

document.addEventListener('mouseup', (e) => {
    mouseIsDown = false;
    generate = false;
});

document.addEventListener('keydown', (e) => {
    instructions.style.display = 'none';
        keyIsDown = true;
});

document.addEventListener('keyup', (e) => {
    keyIsDown = false;
});

let shape = 1;

/*function buildShape(){
    console.log(shape);
    let myShape = new svgShape(`./${String(shape)}.svg`,Math.random()*width,10);
    //let myShape = new svgShape(`./A.svg`,Math.random()*width,10);
    particles.forEach((p) => {
        let destination_point = insidePoints[Math.floor(Math.random() * insidePoints.length)];

        p.d_pos = new Vector(destination_point.x, destination_point.y);
    });
    shape++;
    shape = shape%10;
    
    setTimeout(() => {
        buildShape();
    }, 3000);

}*/

function buildShape(){
    console.log(shape);
    let shape_size = {width:0,height:0};
    fetch('./smile.svg')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(data, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            const width = svgElement.getAttribute('width');
            const height = svgElement.getAttribute('height');
            shape_size.width = width;
            shape_size.height = height;
            console.log(`Width: ${width}, Height: ${height}`);
        }).then(() => {
            new svgShape(`./smile.svg`,(width/2)-shape_size.width/2,(height/2)-shape_size.height/2);
        });
   
    

    particles.forEach((p) => {
        let destination_point = insidePoints[Math.floor(Math.random() * insidePoints.length)];

        p.d_pos = new Vector(destination_point.x, destination_point.y);
    });


}

let keyIsDown = false;

let insidePoints = [];

let particles = [];

buildShape()

animate();








