// const canvas = document.getElementById('circle-particles-canvas');
// const ctx = canvas.getContext("2d");
// ctx.globalAlpha = 0.5;

// let particlesArray = [];
// //todo sarah number of particles for number of colors
// generateParticles(101);
// setSize();
// anim();

// function generateParticles(amount) {
//   for (let i = 0; i < amount; i++) {
//     particlesArray[i] = new Particle(
//       innerWidth / 2,
//       innerHeight / 2,
//       50,
//       generateColor(),
//       0.01,
//     );
//   }
// }

// function generateColor() {
//   let hexSet = "0123456789ABCDEF";
//   let finalHexString = "#";
//   for (let i = 0; i < 6; i++) {
//     finalHexString += hexSet[Math.ceil(Math.random() * 15)];
//   }
//   return finalHexString;
// }

// function setSize() {
//   canvas.height = innerHeight;
//   canvas.width = innerWidth;
// }

// function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
//   this.x = x;
//   this.y = y;
//   this.particleTrailWidth = particleTrailWidth;
//   this.strokeColor = strokeColor;
//   this.theta = Math.random() * Math.PI * 2;
//   this.rotateSpeed = rotateSpeed;
//   this.t = Math.random() * 150;

//   this.rotate = () => {
//     const ls = {
//       x: this.x,
//       y: this.y,
//     };
//     this.theta += this.rotateSpeed;
//     this.x = innerWidth / 2 + Math.cos(this.theta) * this.t;
//     this.y = innerHeight / 2 + Math.sin(this.theta) * this.t;
//     ctx.beginPath();
//     ctx.lineWidth = this.particleTrailWidth;
//     ctx.strokeStyle = this.strokeColor;
//     ctx.moveTo(ls.x, ls.y);
//     ctx.lineTo(this.x, this.y);
//     ctx.stroke();
//   };
// }

// function anim() {
//   requestAnimationFrame(anim);

//   ctx.fillStyle = "rgba(0,0,0,0.05)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   particlesArray.forEach((particle) => particle.rotate());
// }

// //updated version removed from index.js:
// function renderCircleParticlesCanvas(){
//   //todo sarah split this function so it can be called with different sizes for different buttons 
//   //"dandelion" 800 "circle particles" 101 "suncatcher" 1000 - maybe?
//   console.log('rendering circle particles canvas');

//   const canvas = document.getElementById('colorCanvas');
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.globalAlpha = 0.5;

//   let particlesArray = [];
//   const size = 101;
//   let colors = generateParticleColors(size);

//   generateParticles(size, colors);
//   setSize();
//   anim();

//   function generateParticleColors(size){
//     const onItems = Object.values(items).filter(item => item.on);
//     const onColors = onItems.map(item => item.color);
//     let colors = [];

//     while (colors.length < size){
//       colors = [...colors, ...onColors];
//     }
//     console.log(`generateParticleColors colors has ${colors.length} and size is ${size}`);

//     return colors;
//   }

//   function generateParticles(amount, colors) {
//     //console.log(`particlesArray first ${particlesArray.length} and adding ${amount}`);
//     for (let i = 0; i < amount; i++) {
//       particlesArray[i] = new Particle(
//         innerWidth / 2,
//         innerHeight / 2,
//         50,
//         colors[i],
//         0.01,
//       );
//     }
//   }

//   // function generateRandomColor() {
//   //   let hexSet = "0123456789ABCDEF";
//   //   let finalHexString = "#";
//   //   for (let i = 0; i < 6; i++) {
//   //     finalHexString += hexSet[Math.ceil(Math.random() * 15)];
//   //   }
//   //   console.log(finalHexString);
//   //   return finalHexString;
//   // }

//   function setSize() {
//     canvas.height = innerHeight;
//     canvas.width = innerWidth;
//   }

//   function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
//     this.x = x;
//     this.y = y;
//     this.particleTrailWidth = particleTrailWidth;
//     this.strokeColor = strokeColor;
//     this.theta = Math.random() * Math.PI * 2;
//     this.rotateSpeed = rotateSpeed;
//     this.t = Math.random() * 150;

//     this.rotate = () => {
//       const ls = {
//         x: this.x,
//         y: this.y,
//       };
//       this.theta += this.rotateSpeed;
//       this.x = innerWidth / 2 + Math.cos(this.theta) * this.t;
//       this.y = innerHeight / 2 + Math.sin(this.theta) * this.t;
//       context.beginPath();
//       context.lineWidth = this.particleTrailWidth;
//       context.strokeStyle = this.strokeColor;
//       context.moveTo(ls.x, ls.y);
//       context.lineTo(this.x, this.y);
//       context.stroke();
//     };
//   }

//   function anim() {
//     requestAnimationFrame(anim);

//     ctx.fillStyle = "rgba(0,0,0,0.05)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     particlesArray.forEach((particle) => particle.rotate());
//   }
// }
