//feature 2
//colors to make you feel more of whatever buttons you choose on the top
//buttons are: happy, sad, angry, calm, excited, bored, anxious, tired, energized, etc
//a toggled on button means the color palette displays a color "proven" to make you feel that way


//todo try radial gradients with different shapes
//todo sarah particles working when first clicked and no "on" colors
//todo sarah why is particles doing what it's doing when I extra click?
//todo sarah why doesn't the canvas clear between particles and others?
//todo sarah make choice array? choice needs to be in the array?
//todo add different options in the lineargradient function
//todo sarah split into different js files, start with circle particles because it's big
//todo check responsiveness

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
    element.style.backgroundColor = '#f5f5f5';
  } else {
    items[elem].on = true;
    element.style.backgroundColor = items[elem].color;
  }
  setInfinityColors();
  renderCanvas();
}

//todo sarah make this a switch, or a loop through choices array
//then can omit clickedFunctions
function clickedStraightLines(){
  choice = 'sl';
  renderCanvas();
}

function clickedLinearGradient(){
  choice = 'lg';
  renderCanvas();
}

function clickedDiagonalGradient(){
  choice = 'dg';
  renderCanvas();
}

function clickedCircleParticles(){
  choice = 'cp';
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
    case 'cp':
      renderCircleParticlesCanvas();
      break;
    default:
        renderStraightLinesCanvas();
  }
}

function renderStraightLinesCanvas(){
  console.log('rendering straight lines canvas');

  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  const onItems = Object.values(items).filter(item => item.on);
  const itemWidth = canvas.width / onItems.length;

  onItems.forEach((item, index) => {
    if (!item.on) return;
    ctx.fillStyle = item.color;
    ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
  });
}

function renderLinearGradientCanvas(){
  console.log('rendering linear gradient canvas');

  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  const onItems = Object.values(items).filter(item => item.on);

  if (onItems.length === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    //this is normal vertical
    //const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //note: Lexie likes this one below
    //const grd = ctx.createLinearGradient(0, 0, 200, 200);
    const grd = ctx.createLinearGradient(0, 0, 200, 0);

    onItems.forEach((item, index) => {
      grd.addColorStop(index / onItems.length, item.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderDiagonalGradientCanvas(){
  console.log('rendering diagonal gradient canvas - choice is ' + choice);

  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  const onItems = Object.values(items).filter(item => item.on);

  if (onItems.length === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    onItems.forEach((item, index) => {
      grd.addColorStop(index / onItems.length, item.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderRadialGradientCanvas(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Create a radial gradient
  // The inner circle is at x=110, y=90, with radius=30
  // The outer circle is at x=100, y=100, with radius=70
  

  const onItems = Object.values(items).filter(item => item.on);

  if (onItems.length === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

    onItems.forEach((item, index) => {
      gradient.addColorStop(index, item.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, 160, 160);
  }

  // // Add three color stops
  // gradient.addColorStop(0, "pink");
  // gradient.addColorStop(0.9, "white");
  // gradient.addColorStop(1, "green");

  // // Set the fill style and draw a rectangle
  // ctx.fillStyle = gradient;
  // ctx.fillRect(20, 20, 160, 160);
}