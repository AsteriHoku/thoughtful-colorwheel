//todo s Overlaying transparent shapes https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
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
  choice = id;
  console.log('id was ' + id + 'choice is now -->' + choice);
  renderCanvas();
}

function renderCanvas(){
  switch (choice){
    case 'lg':
      renderLinearGradientCanvas();
      break;
    case 'dg':
      renderDiagonalGradientCanvas();
      break;
    case 'rg':
      renderRadialGradientCanvas();
      break;
    case 'cg':
      renderConicGradientCanvas();
      break;
    case 'cp':
      renderCircleParticlesCanvas();
      break;
    default:
      renderStraightLinesCanvas();
  }
}

function getContext(){
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  const onItems = Object.values(items).filter(item => item.on);
  console.log('onItems');
  console.dir(onItems);
  // ctx.reset();
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return {canvas, ctx, onItems};
}

function renderStraightLinesCanvas(){
  console.log('rendering straight lines canvas');

  const {canvas, ctx, onItems} = getContext();
  if (choice !== 'sl') {
    ctx.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    if (onItems.length > 0) {
      const itemWidth = canvas.width / onItems.length;
  
      onItems.forEach((item, index) => {
        if (!item.on) return;
        ctx.fillStyle = item.color;
        ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
      });
    }
  }
}

function renderLinearGradientCanvas(){
  console.log('rendering linear gradient canvas');

  const {canvas, ctx, onItems} = getContext();

  if (choice !== 'lg') {
    ctx.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    if (onItems.length > 0) {
      //normal vertical would be (0, 0, canvas.width, 0);
      const grd = ctx.createLinearGradient(0, 0, 200, 0);

      onItems.forEach((item, index) => {
        grd.addColorStop(index / onItems.length, item.color);
      });

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}

function renderDiagonalGradientCanvas(){
  console.log('rendering diagonal gradient canvas - choice is ' + choice);

  const {canvas, ctx, onItems} = getContext();

  if (onItems.length > 0) {
    const grd = ctx.createLinearGradient(0, 0, 200, 200);

    onItems.forEach((item, index) => {
      grd.addColorStop(index / onItems.length, item.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderRadialGradientCanvas(){
  const {canvas, ctx, onItems} = getContext();

  if (onItems.length > 0) {
    const gradient = ctx.createRadialGradient(150, 70, 20, 150, 80, 90);

    onItems.forEach((item, index) => {
      gradient.addColorStop(index / onItems.length, item.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderConicGradientCanvas(){
  const {canvas, ctx, onItems} = getContext();

  if (onItems.length > 0) {
    const gradient = ctx.createConicGradient(170, 150, 80);

    onItems.forEach((item, index) => {
      gradient.addColorStop((index / onItems.length), item.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderCircleParticlesCanvas(){
  //todo sarah split this function so it can be called with different sizes for different buttons 
  //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
  console.log('rendering circle particles canvas');

  const {canvas, ctx, onItems} = getContext();
  console.log('onItems in renderCircles');
  console.dir(onItems);

  if (onItems.length > 0) {
    const size = 101;
    let colors = generateParticleColors(size, onItems);

    let particlesArray = generateParticles(size, colors);
    console.log('particlesArray');
    console.dir(particlesArray);

    // if (choice === 'cp'){
    //   canvas.height = innerHeight;
    //   canvas.width = innerWidth;
    // } else {
    //   canvas.height = 400;
    //   canvas.width = 1000;
    // }

    animate(particlesArray);

    function generateParticleColors(size, onItems){
      console.log('onItems in generateParticleColors');
      console.dir(onItems);

      const onColors = onItems.map(item => item.color);
      console.log('onColors');
      console.dir(onColors);

      let colors = [];

      while (colors.length < size){
        colors = [...colors, ...onColors];
      }
      console.log(`generateParticleColors colors has ${colors.length} and size is ${size}`);

      return colors;
    }

    function generateParticles(amount, colors) {
      //console.log(`particlesArray first ${particlesArray.length} and adding ${amount}`);
      let particlesArray = [];
      for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
          canvas.width / 2,
          canvas.height / 2,
          50,
          colors[i],
          0.01,
        );
      }
      return particlesArray;
    }

    function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
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

    function animate() {
      // if (choice !== 'cp') {
      //   particlesArray = [];
      //   return;
      // }
      let req = requestAnimationFrame(animate);

      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (choice !== 'cp') {
        cancelAnimationFrame(req);
        //particlesArray = [];
      } else {
        particlesArray?.forEach((particle) => particle.rotate());
      }
    }
  }
}