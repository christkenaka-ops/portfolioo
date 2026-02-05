// MINI JEU
let random = Math.floor(Math.random() * 10) + 1;
function checkGuess(){
  const guess=document.getElementById('guess').value;
  const result=document.getElementById('result');
  if(guess==random){
    result.textContent='Bravo 🎉';
    random=Math.floor(Math.random()*10)+1;
  } else {
    result.textContent='Raté 😅 Réessaie';
  }
}

// CALCULATRICE
function add(value){
  document.getElementById('calc').value+=value;
}
function clearCalc(){
  document.getElementById('calc').value='';
}
function calculate(){
  document.getElementById('calc').value=eval(document.getElementById('calc').value);
}

// GSAP
gsap.from('header h1',{y:-50,opacity:0,duration:1});
gsap.from('section',{scrollTrigger:'section',opacity:0,y:50,stagger:0.3});
/************ FLAPPY BIRD ************/
const canvas = document.getElementById("flappy");
const ctx = canvas.getContext("2d");

let birdY = 200;
let velocity = 0;
let gravity = 0.5;
let jump = -8;

let pipes = [];
let frame = 0;
let scoreFlappy = 0;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(80, birdY, 12, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 40, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 40, canvas.height);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    let gap = 120;
    let top = Math.random() * 200 + 20;
    pipes.push({
      x: canvas.width,
      top: top,
      bottom: top + gap
    });
  }

  pipes.forEach(pipe => pipe.x -= 2);
  pipes = pipes.filter(pipe => pipe.x > -40);
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      80 > pipe.x && 80 < pipe.x + 40 &&
      (birdY < pipe.top || birdY > pipe.bottom)
    ) {
      resetFlappy();
    }
  }

  if (birdY > canvas.height || birdY < 0) {
    resetFlappy();
  }
}

function resetFlappy() {
  birdY = 200;
  velocity = 0;
  pipes = [];
  scoreFlappy = 0;
  document.getElementById("flappyScore").textContent = "Score : 0";
}

function updateScore() {
  scoreFlappy++;
  document.getElementById("flappyScore").textContent = "Score : " + scoreFlappy;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  velocity += gravity;
  birdY += velocity;

  drawBird();
  updatePipes();
  drawPipes();
  checkCollision();

  if (frame % 60 === 0) updateScore();

  frame++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => velocity = jump);
canvas.addEventListener("click", () => velocity = jump);

gameLoop();
