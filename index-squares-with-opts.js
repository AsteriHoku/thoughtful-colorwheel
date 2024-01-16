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
      // case 'cp':
      //   renderCircleParticlesCanvas(canvas, ctx, onItems);
      //   break;
      default:
        console.log('default renderCanvas choice')
        renderStraightLinesCanvas(canvas, ctx, onItems);
    }
  }
}

function getContext(){
  let canvas = document.getElementById('colorCanvas');
  canvas.classList.remove('d-none');
  canvas.width = 1000;
  canvas.height = 600;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //todo sarah can onItems just be colors?
  const onItems = Object.values(items).filter(item => item.on);

  return {canvas, ctx, onItems};
}

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
    //Math.random() * (max - min) + min;
    const minx = canvas.width/20;
    const miny = canvas.height/20;
    const size = Math.random() * (minx*5);
    const maxx = canvas.width - minx - size;
    const maxy = canvas.height - miny - size;
    const randx = Math.random() * (maxx - minx) + minx;
    const randy = Math.random() * (maxy - miny) + miny;

    ctx.fillRect(randx, randy, size, size);
  })

  //todo idea split the canvas up into sections acccording to no of on colors
  //so squares don't overlay each other
  //or I guess do a check to make sure there isn't an existing square where you're about to place one
  //perhaps generate a list of randx, randy, size first to make it a data structure

  // onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   //Math.random() * (max - min) + min;
  //   const minx = canvas.width/4;
  //   const miny = canvas.height/4;
  //   let randx = Math.random() * (canvas.width - minx*2) + minx;
  //   let randy = Math.random() * (canvas.height - miny*2) + miny;
  //   ctx.fillRect(randx, randy, canvas.width-(randx*index), canvas.height-(randy*index));
  // })

  // onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   let randx = Math.random() * canvas.width/2;
  //   let randy = Math.random() * canvas.height/2;
  //   ctx.fillRect(randx, randy, canvas.width/randx, canvas.height/randy);
  // })

  // onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   let rand = Math.random() * (canvas.height/2);
  //   ctx.fillRect(rand, rand, canvas.width/rand, canvas.height/rand);
  // })

  //todo s version to try as bottom right pyramid looking thing
  //   onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   //Math.random() * (max - min) + min;
  //   // const minx = canvas.width/4;
  //   // const miny = canvas.height/4;
  //   let randx = Math.random() * canvas.width;
  //   let randy = Math.random() * canvas.height;
  //   const inc = index+1;
  //   ctx.fillRect(randx, randy, canvas.width-(inc), canvas.height-(inc));
  //   console.log(`for ${item.color} with index ${index} - ${randx} , ${randy} , ${canvas.width-(randx*inc)} , ${canvas.height-(randy*inc)}`)
  // })

  //todo s version with dancing sizes
  // onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   const minx = canvas.width/10;
  //   const miny = canvas.height/10;
  //   let size = Math.random() * (minx*index);
  //   const maxx = canvas.width - minx - size;
  //   const maxy = canvas.height - miny - size;

  //   console.log('canvas.width ' + canvas.width + ' canvas.height ' + canvas.height);
  //   console.log(`minx ${minx} maxx ${maxx}`);
  //   console.log(`miny ${miny} maxy ${maxy}`);
  //   let randx = Math.random() * (maxx - minx) + minx;
  //   let randy = Math.random() * (maxy - miny) + miny;

  //   ctx.fillRect(randx, randy, size, size);
  //   console.log(`randx ${randx}, randy ${randy}`);
  // })

  //todo s big squares version
  // onItems.forEach((item, index) => {
  //   ctx.fillStyle = item.color;
  //   //Math.random() * (max - min) + min;
  //   const minx = canvas.width/20;
  //   const miny = canvas.height/20;
  //   const size = Math.random() * (minx*10);
  //   const maxx = canvas.width - minx - size;
  //   const maxy = canvas.height - miny - size;

  //   let randx = Math.random() * (maxx - minx) + minx;
  //   let randy = Math.random() * (maxy - miny) + miny;

  //   ctx.fillRect(randx, randy, size, size);
  // })
}