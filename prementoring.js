//todo s Overlaying transparent shapes https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
//todo s Quadradic curve! https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
//todo add different options in the lineargradient function

let choice = 'sl';

let items = {
  frustrated: {color: '#eb574c', on: false},
  sad: {color: '#eba64c', on: false},
  tired: {color: '#e0eb4c', on: false},
  anxious: {color: '#4ceb57', on: false},
  bored: {color: '#4ceba7', on: false},
  confused: {color: '#4ce0eb', on: false},
  thinking: {color: '#4c91eb', on: false},
  interested: {color: '#574ceb', on: false},
  happy: {color: '#a64ceb', on: false},
  excited: {color: '#eb4ce0', on: false},
};

const staticChoices = ['sl','lg','dg','rg','ss','cg'];
const animatedChoices = ['cp'];

setInfinityColors();
renderCanvas();

function setInfinityColors() {
  const onItems = Object.values(items).filter(item => item.on);
  const colors = onItems.map(item => item.color);
  let elem = document.getElementById('infinity');

  if (colors.length > 0 && colors.length < 8) {
    for (let i = 0; i < 8; ++i) {
      colors.push(colors[i]);
      if (colors.length === 8) break;
    }
    elem.style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
  } else {
    elem.style.backgroundImage = '';
  }
}

function changeColor(element) {
  let elem = element.id;

  if (items[elem].on === true){
    items[elem].on = false;
    element.style.backgroundColor = '#d5dfed';
  } else {
    items[elem].on = true;
    element.style.backgroundColor = items[elem].color;
  }
  //console.log('in changeColor -> setInfinityColors');
  setInfinityColors();
  renderCanvas();
}

function handleChoiceClicked(id){
  choice = id ? id : 'sl';
  renderCanvas();
}

function renderCanvas(){
  const {canvas, ctx, onItems} = getContext();
  console.log('onItems in renderCanvas is: ', onItems.length);

  if (onItems.length > 0) {
    switch (choice){
      case 'lg':
      case 'dg':
      case 'rg':
      case 'cg':
        renderGradientCanvas(canvas, ctx, onItems);
        break;
      case 'ss':
        renderShapesCanvas(canvas, ctx, onItems);
        break;
      case 'cp':
        renderCircleParticlesCanvas(canvas, ctx, onItems);
        break;
      default:
        renderStraightLinesCanvas(canvas, ctx, onItems);
    }
  }
}

function getContext(){
  let canvas;
  let sc = document.getElementById('colorCanvas');
  let ac = document.getElementById('animatedCanvas');
  if (staticChoices.includes(choice)){
    sc.classList.remove('d-none');
    ac.classList.add('d-none');
    canvas = sc;
  } else {
    sc.classList.add('d-none');
    ac.classList.remove('d-none');
    ac.style.width = '';//reset to default after cp animation changes it
    ac.style.height = '';
    canvas = ac;
  }

  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //todo sarah can onItems just be colors?
  const onItems = Object.values(items).filter(item => item.on);

  return {canvas, ctx, onItems};
}

function renderStraightLinesCanvas(canvas, ctx, onItems){
  //console.log('rendering straight lines canvas');
  const itemWidth = canvas.width / onItems.length;

  onItems.forEach((item, index) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
  });
}

function renderGradientCanvas(canvas, ctx, onItems){
  //console.log('rendering gradient canvas - choice is ' + choice);
  let grd;
  switch (choice){
    case 'lg':
      //normal vertical would be (0, 0, canvas.width, 0);
      grd = ctx.createLinearGradient(0, 0, 200, 0);
      break;
    case 'dg':
      grd = ctx.createLinearGradient(0, 0, 200, 200);
      break;
    case 'rg':
      grd = ctx.createRadialGradient(150, 70, 20, 150, 80, 90);
      break;
    case 'cg':
      grd = ctx.createConicGradient(170, 150, 80);
      break;
  }

  onItems.forEach((item, index) => {
    grd.addColorStop(index / onItems.length, item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShapesCanvas(canvas, ctx, onItems){
  // ctx.globalAlpha = 0.5;

  // ctx.fillStyle = "blue";
  // ctx.fillRect(10, 10, 100, 100);

  // ctx.fillStyle = "red";
  // ctx.fillRect(50, 50, 100, 100);

}

function renderCircleParticlesCanvas(canvas, ctx, onItems){
  //todo sarah split this function so it can be called with different sizes for different buttons 
  //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
  console.log('rendering circle particles canvas');

  //comment this out to fix colors
  // canvas.height = innerHeight;
  // canvas.width = innerWidth;

  animate(canvas, ctx, onItems);
}

function animate(canvas, ctx, onItems) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 101;
  const colors = generateParticleColors(size, onItems);
  const particlesArray = generateParticles(size, colors, canvas, ctx);
  //comment this out to get the intended animation
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  //note: resizing clears the canvas - could maybe add eventlistener for resizing
  //and set logic for when resizing happens
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //todo
  if (choice !== 'cp' || particlesArray.length === 0) {
    cancelAnimationFrame(req);
  } else {
    particlesArray?.forEach((particle) => particle.rotate());
  }
  let req = requestAnimationFrame(() => animate(canvas, ctx, onItems));
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed, canvas, ctx) {
  console.log('Particle()');
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150;

  this.rotate = () => {
    const ls = { x: this.x, y: this.y };
    this.theta += this.rotateSpeed;
    this.x = canvas.width / 2 + Math.cos(this.theta) * this.t;
    this.y = canvas.height / 2 + Math.sin(this.theta) * this.t;
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };
}

function generateParticleColors(size, onItems){
  console.log('generateParticleColors()');
  const onColors = onItems.map(item => item.color);
  console.log('onColors inside genPC: ', onColors);
  let colors = [];

  while (colors.length < size){
    colors = [...colors, ...onColors];
  }
  //console.log(`filled colors has ${colors.length} and size is ${size}`);
  //note: this seems to be unnecessary like I originally thought
  // while (colors.length > size){
  //   colors.pop();
  // }
  //console.log(`colors now should be even with size ${colors.length} === ${size} ? ==> ${colors.length === size}`);

  return colors;
}

function generateParticles(amount, colors, canvas, ctx) {
  console.log('generateParticles()');
  let particlesArray = [];
  for (let i = 0; i < amount; ++i) {
    particlesArray[i] = new Particle(
      canvas.width / 2,
      canvas.height / 2,
      50,
      colors[i],
      0.01,
      canvas,
      ctx
    );
  }
  return particlesArray;
}