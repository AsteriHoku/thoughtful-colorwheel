//todo s Overlaying transparent shapes https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
//todo s Quadradic curve! https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
//todo sarah make choice array? choice needs to be in the array?
//todo add different options in the lineargradient function
//todo sarah split into different js files, start with circle particles because it's big

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

const staticChoices = ['sl','lg','dg','rg','cg'];
const animatedChoices = ['cp'];

setInfinityColors();
renderCanvas();

function setInfinityColors() {
  const onItems = Object.values(items).filter(item => item.on);
  const colors = onItems.map(item => item.color);
  
  if (colors.length < 8) {
    for (let i = 0; i < 8; i++) {
      colors.push(colors[i]);
      if (colors.length === 8) break;
    }
  }

  document.getElementById('infinity').style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
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
  setInfinityColors();
  renderCanvas();
}

function handleChoiceClicked(id){
  choice = id ? id : 'sl';
  renderCanvas();
}

function renderCanvas(){
  const {canvas, ctx, onItems} = getContext();

  if (onItems.length > 0) {
    switch (choice){
      case 'lg':
        renderLinearGradientCanvas(canvas, ctx, onItems);
        break;
      case 'dg':
        renderDiagonalGradientCanvas(canvas, ctx, onItems);
        break;
      case 'rg':
        renderRadialGradientCanvas(canvas, ctx, onItems);
        break;
      case 'cg':
        renderConicGradientCanvas(canvas, ctx, onItems);
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

  const ctx = canvas.getContext('2d');
  // ctx.reset();
  //todo sarah can onItems just be colors?
  const onItems = Object.values(items).filter(item => item.on);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return {canvas, ctx, onItems};
}

function renderStraightLinesCanvas(canvas, ctx, onItems){
  console.log('rendering straight lines canvas');

  const itemWidth = canvas.width / onItems.length;

  onItems.forEach((item, index) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
  });
}

function renderLinearGradientCanvas(canvas, ctx, onItems){
  console.log('rendering linear gradient canvas');
  //normal vertical would be (0, 0, canvas.width, 0);
  const grd = ctx.createLinearGradient(0, 0, 200, 0);

  onItems.forEach((item, index) => {
    grd.addColorStop(index / onItems.length, item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//todo sarah combine all gradient functions to remove repeat code
function renderDiagonalGradientCanvas(canvas, ctx, onItems){
  console.log('rendering diagonal gradient canvas - choice is ' + choice);

  const grd = ctx.createLinearGradient(0, 0, 200, 200);

  onItems.forEach((item, index) => {
    grd.addColorStop(index / onItems.length, item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderRadialGradientCanvas(canvas, ctx, onItems){
  const grd = ctx.createRadialGradient(150, 70, 20, 150, 80, 90);

  onItems.forEach((item, index) => {
    grd.addColorStop(index / onItems.length, item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderConicGradientCanvas(canvas, ctx, onItems){
  const grd = ctx.createConicGradient(170, 150, 80);

  onItems.forEach((item, index) => {
    grd.addColorStop((index / onItems.length), item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderCircleParticlesCanvas(canvas, ctx, onItems){
  //todo sarah split this function so it can be called with different sizes for different buttons 
  //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
  console.log('rendering circle particles canvas');

  const size = 101;
  let colors = generateParticleColors(size, onItems);
  let particlesArray = generateParticles(size, colors, canvas, ctx);
  animate(particlesArray, canvas, ctx);
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed, canvas, ctx) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
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
  const onColors = onItems.map(item => item.color);
  console.log('onColors inside genPC: ', onColors);
  let colors = [];

  while (colors.length < size){
    colors = [...colors, ...onColors];
  }

  return colors;
}

function generateParticles(amount, colors, canvas, ctx) {
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

function animate(particlesArray, canvas, ctx) {
  console.log('animating for particles count: ', particlesArray.length);
  // if (choice !== 'cp') {
  //   particlesArray = [];
  //   return;
  // }
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  let req = requestAnimationFrame(() => animate(particlesArray, canvas, ctx));

  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (choice !== 'cp') {
    cancelAnimationFrame(req);
    //particlesArray = [];
  } else {
    particlesArray?.forEach((particle) => particle.rotate());
  }
}