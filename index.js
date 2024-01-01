//feature 1
//buttons along the top, toggle on/off
//button click rerenders a color canvas below
//all colors are in an ordered array, color gets added/subtracted from display array
//or array can have an off/on bool & display array only shows on colors
//this will allow a beautiful color palette
//and manipulation of matching "things" to colors is easier

//feature 2
//colors to make you feel more of whatever buttons you choose on the top
//buttons are: happy, sad, angry, calm, excited, bored, anxious, tired, energized, etc
//a toggled on button means the color palette displays a color "proven" to make you feel that way

// const colorArray = [
//   ['#1FCEFF','#1FE1FF','#1FF4FF','#1FFFF8','#1FFFE5','#1FFFD2','#1FFFBF','#1FFFAD','#1FFF9A','#1FFF87'],
//   ['#BC1FFF','#A91FFF','#961FFF','#841FFF','#711FFF','#5E1FFF','#4B1FFF','#391FFF','#261FFF','#1F2AFF'],
//   ['#FFDA1F','#FFC71F','#FFB41F','#FFA21F','#FF8F1F','#FF7C1F','#FF691F','#FF571F','#FF441F','#FF311F']
// ];

//OG
// let items = {
//   frustrated: {color: '#ff4538', on: true},
//   sad: {color: '#ffa938', on: true},
//   tired: {color: '#f2ff38', on: true},
//   anxious: {color: '#38ff45', on: true},
//   bored: {color: '#38ffa9', on: true},
//   thinking: {color: '#388fff', on: true},
//   excited: {color: '#4538ff', on: true},
//   happy: {color: '#a838ff', on: true},
//   interested: {color: '#ff38f2', on: true},
//   energized: {color: '#ff388e', on: true},
// };

let items = {
  frustrated: {color: '#eb574c', on: false},
  sad: {color: '#eba64c', on: false},
  tired: {color: '#e0eb4c', on: false},
  anxious: {color: '#4ceb57', on: false},
  bored: {color: '#4ceba7', on: false},
  thinking: {color: '#4ce0eb', on: false},
  excited: {color: '#4c91eb', on: false},
  happy: {color: '#574ceb', on: false},
  interested: {color: '#a64ceb', on: false},
  energized: {color: '#eb4ce0', on: false},
};

// let onItems = Object.values(items).filter(item => item.on);
// console.log('init onItems is:');
// console.dir(onItems);

//setButtonColors();
setInfinityColors();
renderColorCanvas();

// function setButtonColors() {
//   Object.keys(items).forEach(item => {
//     document.getElementById(item).style.backgroundColor = items[item].color;
//   });
// }

function setInfinityColors() {
  console.log('~~~ setting infinity colors');
  const onItems = Object.values(items).filter(item => item.on);
  const colors = onItems.map(item => item.color);
  console.log('colors on are:');
  console.dir(colors);

  if (colors.length < 8 && colors.length > 0) {
    console.log(`colors for infinity was less than 8 (${colors.length}) filling to 8`);
    for (let i = 0; i < 8; i++) {
      colors.push(colors[i]);
      if (colors.length === 8) break;
    }
  }
  console.log('colors after filling are:' + colors);

  document.getElementById('infinity').style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
  // let elem = document.getElementById('infinity');
  // console.log('elem is:');
  // console.dir(elem);
  // elem.style.borderColor = `${colors.join(', ')}`;
  // elem.style.borderRightColor = '#eb574c';
  // elem.style.borderBottomColor = colors[1];
  // elem.style.borderLeftColor = colors[2];
  // elem.style.borderTopColor = colors[3];
}

// function setInfinityColors() {
//   const colors = Object.values(items).map(item => item.color);
//   document.getElementById('infinity').style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
// }

function renderColorCanvas() {
  console.log('~~~ rendering color canvas');
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  const onItems = Object.values(items).filter(item => item.on);
  const itemWidth = canvas.width / onItems.length;

  if (onItems.length === 0) {
    //todo sarah make this a pretty gradient or picture or something
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //idea for clearing a specific region so the pattern stays the same
    // Clear a specific region (e.g., clear a 100x100 square starting from (50, 50))
    // ctx.clearRect(50, 50, 100, 100);
  } else {
    onItems.forEach((item, index) => {
      if (!item.on) return;
      ctx.fillStyle = item.color;
      ctx.fillRect(index * itemWidth, 0, itemWidth, canvas.height);
      ctx.fillText('star here', index * itemWidth, canvas.height - 10);
    });
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