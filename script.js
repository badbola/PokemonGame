const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");
//score of te game
let score = 0;
let HighScore = 0;
// a value for ease in movement and generation of random numbers
const box = 32;
// counter for pokeballs
let count = 0;
//array having coordinates of pokeballs
let all_poke = [];
// using Local Storage for high score **Additional Feature**
if (localStorage.getItem("HighScore") == null) {
  localStorage.setItem("HighScore", HighScore);
} else {
  HighScore = localStorage.getItem("HighScore");
}

let game;
let repeat;

var bg = new Image();

bg.src = "img/bg.jpg";

const pikachu = new Image();

pikachu.src = "img/pika.png";

const pokeball = new Image();

pokeball.src = "img/poke.png";

const pika = new Audio();

pika.src = "sound/catch.mp3";

const over = new Audio();

over.src = "sound/over.mp3";
// position of sprite
let spritePos = {
  x: 9 * box,
  y: 10 * box,
};

// function to read and handle input of arrow keys
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37) {
    if (spritePos.x > 0) {
      spritePos.x -= box;
    }
  }
  if (event.keyCode == 38) {
    if (spritePos.y > 96) {
      spritePos.y -= box;
    }
  }
  if (event.keyCode == 39) {
    if (spritePos.x < 544) {
      spritePos.x += box;
    }
  }
  if (event.keyCode == 40) {
    if (spritePos.y < 544) {
      spritePos.y += box;
    }
  }
}

// initially draw pokeball
function drawPoke() {
  if (count == 0) {
    for (let index = 0; index < 6; index++) {
      all_poke[index] = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
      if (count > 0) {
        all_poke.forEach((element) => {
          if (
            element.x == all_poke[index].x &&
            element.y == all_poke[index].y
          ) {
            all_poke[index] = {
              x: Math.floor(Math.random() * 17 + 1) * box,
              y: Math.floor(Math.random() * 15 + 3) * box,
            };
          }
        });
      }
      count += 1;
      console.log(all_poke[index]);
    }
  }
}
// draw pokeball at regular time interval
function pokeArr() {
  if (count < 10) {
    let length = all_poke.length;
    for (let index = length; index < 6 + length; index++) {
      all_poke.push({
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      });
      if (count > 0) {
        all_poke.forEach((element) => {
          if (
            element.x == all_poke[index].x &&
            element.y == all_poke[index].y
          ) {
            all_poke[index] = {
              x: Math.floor(Math.random() * 17 + 1) * box,
              y: Math.floor(Math.random() * 15 + 3) * box,
            };
          }
        });
      }
      count += 1;
      console.log(all_poke[index]);
    }
  }
}
// main draw on canvas
function draw() {
  context.clearRect(0, 0, 608, 608);
  context.drawImage(bg, 0, 0);
  drawPoke();
  for (let index = 0; index < all_poke.length; index++) {
    context.drawImage(pokeball, all_poke[index].x, all_poke[index].y);
  }

  context.drawImage(pikachu, spritePos.x, spritePos.y);
  context.fillStyle = "white";
  context.font = "20px Helvetica Neue";
  context.fillText("Score" + " " + score, box, 1.6 * box);
  context.fillText(
    "High Score" + " " + localStorage.getItem("HighScore"),
    8 * box,
    1.6 * box
  );
  context.fillText("Pokeball" + " " + count, 15 * box, 1.6 * box);
  all_poke.forEach((element) => {
    if (element.x == spritePos.x && spritePos.y == element.y) {
      let a = all_poke.indexOf(element);
      all_poke.splice(a, 1);
      score += 1;
      count -= 1;
      pika.play();
    }
  });
  //Game over
  if (count >= 10) {
    clearInterval(game);
    clearInterval(repeat);
    context.fillStyle = "white";
    context.font = "45px Open Sans";
    context.fillText("Game Over", 6 * box, 10 * box);
    if (score > HighScore) {
      localStorage.setItem("HighScore", score);
    }
    over.play();
  }
}
// Rules and canvas initiation
function visible() {
  canvas.style.visibility = "visible";
  document.getElementById("main").innerHTML = "";
  console.log(document.getElementById("main").visibility);
  game = setInterval(draw, 100);
  repeat = setInterval(pokeArr, 10000);
}
