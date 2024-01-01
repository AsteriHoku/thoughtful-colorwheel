//feature 1

//feature 2
//colors to make you feel more of whatever buttons you choose on the top
//buttons are: happy, sad, angry, calm, excited, bored, anxious, tired, energized, etc
//a toggled on button means the color palette displays a color "proven" to make you feel that way

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

// const starfield = `*　　　　　　•　°　　　　　*　　·　　　　　　　.　　　✧　　·•　　.　　\n
// 　°　　　　°　　　　　　　　　　　　　　.°　　.　.✶*　　　*　　　.·　\n
// 　　　　　　　　★　•　*..*　　°★　.　　·　　°　　　　　　.　　　　　\n
// 　　°　·　✯　　　　✷　　　　　·　　　　·　　　　.　　　☆　°★✧　　　　\n
// .　　　✶•　.　　　　　　　·　✧✸　✷　　　　　☆　.　　•　　.　　　　　\n
// 　　　　　　　✷　　　　　　　°　　　　　•　•　　　　　　　·　°　*☆　·*\n
// *☆*　　　•　　　　　　✷*　　　　　　　•　　　　·　　　　　•　.　.·　\n
// *　*　•　　　✦•　　　•　·　　　　　　　　•　　　　　　°✧　　　　　　　\n
// ·　　　　✷　*　　✸　　　　　★　　·　　　　·　*　　　　•　　　　　　　　\n
// 　·　.✧　　　　✧　　　　　·☆　·　·　.°*.　　　　✧　.☆　　　　　　\n
// 　　　　　　　✦.　　　　☆　°　　.　　　✧　•　　　　✯　　.　　*.°　　\n
// 　　　　　　.　•　*　　　　　.　　　　　*　　°　　　　　　✸·　　　*　*\n
// 　*　　　·　　　*•*　　.·•　*　　　　　　.　　·*°.　　　　°　　　\n
// 　　　　　　　　　.　　　•　　•★　*　　　　　　　　　　　　　　　　★✸　　\n
// 　•　·°　　　°·　*✸　•　　　　.　　　　　　✶　　　　　　*　　　　　　\n
// 　*.·　**　••　　　　　　✦　　*.　　·　　★••　★　　　✸　　　　　\n
// 　　　••　　　　　　　　　✯　°*　•　·　✧　　　　　　　　✶　*　　.　　\n
// 　*°*　　　*　　✷✯☆　　　　　　　　☆　　·　*　.　　　•　•　　　　　\n
// •★　　　°　　　*　　　　.　*　　•　　°　　　　✵　.•　　.　　　　　　\n
// 　　　　°.　　　　.·*✧　　　　　　　　　　　✧　　•　　　　　*　　☆　　`;

setInfinityColors();
renderColorCanvas();

// function setButtonColors() {
//   Object.keys(items).forEach(item => {
//     document.getElementById(item).style.backgroundColor = items[item].color;
//   });
// }

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

function renderColorCanvas() {
  console.log('~~~ rendering color canvas');
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  const onItems = Object.values(items).filter(item => item.on);
  const itemWidth = canvas.width / onItems.length;

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

    // onItems.forEach((item, index) => {
    //   if (!item.on) return;
    //   ctx.fillStyle = item.color;
    //   ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
    // });
  }
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
  renderColorCanvas();
}