//todo s Overlaying transparent shapes https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
//todo s Quadradic curve! https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
//todo add different options in the lineargradient function
//todo s break up logic for single responsibility and clean/concise code
//todo s revisit css sizing and responsiveness

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

// #region main funcs

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
  setInfinityColors();
  renderCanvas();
}

function handleChoiceClicked(id){
  choice = id ? id : 'sl';
  renderCanvas();
}
//for dev purposes
function selectAllColors(){
  for (const key in items) {
    items[key].on = true;
  }
  renderCanvas();
}

function renderCanvas(){
  const {canvas, ctx, onItems} = getContext();

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

function getContext(isAnimated){
  if (isAnimated){
    document.getElementById('animatedCanvas').classList.remove('d-none');
    document.getElementById('colorCanvas').classList.add('d-none');
  } else{
    document.getElementById('animatedCanvas').classList.add('d-none');
    document.getElementById('colorCanvas').classList.remove('d-none');
  }
  let canvas = isAnimated ? document.getElementById('animatedCanvas') : document.getElementById('colorCanvas');
  canvas.width = 1000;
  canvas.height = 600;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //todo sarah can onItems just be colors?
  const onItems = Object.values(items).filter(item => item.on);

  return {canvas, ctx, onItems};
}
// #endregion main funcs

// #region canvas renders
function renderStraightLinesCanvas(canvas, ctx, onItems){
  const itemWidth = canvas.width / onItems.length;

  onItems.forEach((item, index) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
  });
}

function renderGradientCanvas(canvas, ctx, onItems){
  let grd;
  switch (choice){
    case 'lg':
      grd = ctx.createLinearGradient(0, 0, canvas.width*0.75, 0);
      break;
    case 'dg':
      grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height/2);
      break;
    case 'rg':
      const xcenter = canvas.width/2;
      const ycenter = canvas.height/3;
      grd = ctx.createRadialGradient(xcenter, ycenter, 70, xcenter, ycenter+100, 340);
      break;
    case 'cg':
      grd = ctx.createConicGradient(170, canvas.width/2, canvas.height/2);
      break;
  }

  onItems.forEach((item, index) => {
    grd.addColorStop(index / onItems.length, item.color);
  });

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShapesCanvas(canvas, ctx, onItems){
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width, canvas.height);

  onItems.forEach((item, index) => {
    ctx.fillStyle = item.color;
    const minx = canvas.width/20;
    const miny = canvas.height/20;
    const size = Math.random() * (minx*5);
    const maxx = canvas.width - minx - size;
    const maxy = canvas.height - miny - size;
    const randx = Math.random() * (maxx - minx) + minx;
    const randy = Math.random() * (maxy - miny) + miny;

    ctx.fillRect(randx, randy, size, size);
  })
}
// #endregion canvas renders

// #region circle particles

function renderCircleParticlesCanvas(canvas, ctx, onItems){
  //todo sarah split this function so it can be called with different sizes for different buttons 
  //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
  ctx.globalAlpha = 0.5;

  animate(canvas, ctx, onItems);
}

function animate(canvas, ctx, onItems) {
 // ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 101;
  const colors = generateParticleColors(size, onItems);
  const particlesArray = generateParticles(size, colors, canvas, ctx);
  console.dir(particlesArray);

  //note: resizing clears the canvas - could maybe add eventlistener for resizing
  //and set logic for when resizing happens
  
  let anim_frame = requestAnimationFrame(() => animate(canvas, ctx, onItems));
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (choice !== 'cp' || particlesArray.length === 0) {
    cancelAnimationFrame(anim_frame);
  } else {
    particlesArray?.forEach((particle) => particle.rotate());
  }
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
  const onColors = onItems.map(item => item.color);
  console.log('onColors inside genPC with on colors: ', onColors);
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
      10,//thickness of the line
      colors[i],
      0.01,
      canvas,
      ctx
    );
  }
  return particlesArray;
}

// #endregion circle particles