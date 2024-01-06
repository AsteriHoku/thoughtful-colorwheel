//feature 1

//feature 2
//colors to make you feel more of whatever buttons you choose on the top
//buttons are: happy, sad, angry, calm, excited, bored, anxious, tired, energized, etc
//a toggled on button means the color palette displays a color "proven" to make you feel that way


// function openNav() {
//   document.getElementById("sidenav").style.width = "200px";
// }

// function closeNav() {
//   document.getElementById("sidenav").style.width = "0";
// }

// function loadContent(page) {
//   const contentContainer = document.getElementById('colorCanvas');

//   fetch(page)
//     .then(response => response.text())
//     .then(html => {
//       contentContainer.innerHTML = html;
//     })
//     .catch(error => {
//       console.error('Error loading content:', error);
//     });
// }


//todo sarah make choice array? choice needs to be in the array?

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
renderStraightLinesCanvas();

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
    element.style.backgroundColor = '#f5f5f5';
  } else {
    items[elem].on = true;
    element.style.backgroundColor = items[elem].color;
  }
  //todo sarah make this a switch, or a loop through choices array
  setInfinityColors();
  renderCanvas(choice);
}

function clickedStraightLines(){
  choice = 'sl';
  renderCanvas(choice);
}

function clickedLinearGradiant(){
  choice = 'lg';
  renderCanvas(choice);
}

function clickedCircleParticles(){
  choice = 'cp';
  renderCanvas(choice);
}

function renderCanvas(choice){
  // const canvas = document.getElementById('colorCanvas');
  // const ctx = canvas.getContext('2d');
  // ctx.reset();
  console.log('canvas has been reset');
  switch (choice){
    case 'lg':
      renderLinearGradiantCanvas();
      break;
    case 'cp':
      renderCircleParticlesCanvas();
      break;
    case 'dg':
      renderDiagonalGradiantCanvas();
    default:
        renderStraightLinesCanvas();
  }
}

function renderStraightLinesCanvas(){
  console.log('rendering straight lines canvas');
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  const onItems = Object.values(items).filter(item => item.on);
  const itemWidth = canvas.width / onItems.length;

  onItems.forEach((item, index) => {
    if (!item.on) return;
    ctx.fillStyle = item.color;
    ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
  });
}

function renderLinearGradiantCanvas(){
  console.log('rendering linear gradiant canvas');
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  const onItems = Object.values(items).filter(item => item.on);

  if (onItems.length === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    const grd = ctx.createLinearGradient(0, 0, 200, 0);

    onItems.forEach((item, index) => {
      grd.addColorStop(index / onItems.length, item.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderCircleParticlesCanvas(){
  //todo sarah split this function so it can be called with different sizes for different buttons 
  //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
  console.log('rendering circle particles canvas');
  const canvas = document.getElementById('colorCanvas');
  const context = canvas.getContext("2d");
  context.globalAlpha = 0.5;

  let particlesArray = [];
  const size = 101;
  let colors = generateParticleColors(size);
  console.dir(colors);
  //todo sarah number of particles for number of colors
  generateParticles(size, colors);
  setSize();
  anim();

  function generateParticleColors(size){
    const onItems = Object.values(items).filter(item => item.on);
    const onColors = onItems.map(item => item.color);
    let colors = [];

    while (colors.length < size){
      colors = [...colors, ...onColors];
    }
    console.log(`generateParticleColors colors has ${colors.length} and size is ${size}`);

    return colors;
  }

  function generateParticles(amount, colors) {
    //console.log(`particlesArray first ${particlesArray.length} and adding ${amount}`);
    for (let i = 0; i < amount; i++) {
      particlesArray[i] = new Particle(
        innerWidth / 2,
        innerHeight / 2,
        50,
        colors[i],
        0.01,
      );
    }
  }

  // function generateRandomColor() {
  //   let hexSet = "0123456789ABCDEF";
  //   let finalHexString = "#";
  //   for (let i = 0; i < 6; i++) {
  //     finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  //   }
  //   console.log(finalHexString);
  //   return finalHexString;
  // }

  function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
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
      this.x = innerWidth / 2 + Math.cos(this.theta) * this.t;
      this.y = innerHeight / 2 + Math.sin(this.theta) * this.t;
      context.beginPath();
      context.lineWidth = this.particleTrailWidth;
      context.strokeStyle = this.strokeColor;
      context.moveTo(ls.x, ls.y);
      context.lineTo(this.x, this.y);
      context.stroke();
    };
  }

  function anim() {
    requestAnimationFrame(anim);

    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => particle.rotate());
  }
}

function renderShadowCanvas(){

}