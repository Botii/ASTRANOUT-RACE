const player1Spikes = [];



let astranoutImg;
let spikesImg;
let song; 

let timer = 20;
let countDownSwitch = false;


let scorePlayer1 = 0;
let player1winning = false;



// GAME WIDTH AND HEIGHT
const gameWH = 500;

function preload() {
  astranoutImg = loadImage("assets/astranout.png");
  spikesImg = loadImage("assets/spikes.png");
  song = loadSound('assets/sound.mp3');
}

function setup() {
  const canvas = createCanvas(gameWH, gameWH);
  canvas.parent("game");
  song.play();

  imageMode(CENTER, CENTER);

  astranout1 = createSprite();
  astranout1.scale = 0.1;
  astranout1.addImage(astranoutImg);
  astranout1.position.y = gameWH * 0.9;
  astranout1.position.x = gameWH * 0.1;






  // GENERATE SPIKES FOR PLAYER 1
  for (let x = 0; x < 3; x++) {
    const spike = createSprite(random( gameWH * 1) + 1);
    spike.addImage(spikesImg);  
    spike.scale = 0.10;

    player1Spikes.push(spike);
  }
}


function draw() {
  background(50);


    drawSprites();
    playerControls();
    spikesDown();

    textSize(20);
    text('score = ',  10, 20);
    textSize(19.5);
    text(scorePlayer1, 80, 22);
  
  
    /////////////timer////////////////
    textAlign(CENTER,CENTER);
    textSize(100);
    text(timer, width/2, height/2);
    if (frameCount % 60 == 0 && timer > 0){
      timer--;
    }
    if (timer <= 0){
      textSize(20);
      text('game over', width/2, height * 0.667);
      GameOver();
  

  }
 
}


function spikesDown() {



      // PLAYER 1 SPIKES
  for (let x = 0; x < player1Spikes.length; x++) {
    // CHECKS IF SPIKE IS COLLIDING WITH PLAYER
    player1Spikes[x].collide(astranout1, function() {
      this.position.x = random( ( gameWH * 0.9) + 1);
      this.position.y = gameWH * 0.1;
      scorePlayer1 += 10;
    });

    // PUT SPIKE BACK TO TOP IF IT REACHES GROUND
    if (player1Spikes[x].position.y >= gameWH) {
      player1Spikes[x].position.x = random( (gameWH * 0.9) + 1);
      player1Spikes[x].position.y = gameWH * 0.1;
    } else {

      if(scorePlayer1 <= 100){
        player1Spikes[x].position.y += 5;
      }
      
      else if(scorePlayer1 >= 100){
        player1Spikes[x].position.y += 10;
      }

      else if(scorePlayer1 >= 200){
        player1Spikes[x].position.y += 15;
      }
      else if(scorePlayer1 >= 300){
        player1Spikes[x].position.y += 20;
      }
      else if(scorePlayer1 >= 400){
        player1Spikes[x].position.y += 25;
      }
      else if(scorePlayer1 >= 500){
        player1Spikes[x].position.y += 30;
      }

    }
  }
  

}

  

function playerControls() {
  // PLAYER 1 | A
  if (keyIsDown(65)) {
    if (astranout1.position.x > 45) {
      astranout1.position.x -= 10
    }
  }

  // PLAYER 1 | D
  if (keyIsDown(68)) {
    if (astranout1.position.x < (445)) {
      astranout1.position.x += 10;
    }
  }

}


function GameOver(Timer, gameOverScreen){
  background(50)
  rect(0,0, 500, 500)
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2)
  text("SCORE = " + scorePlayer1, width / 2, height / 2 + 20)
  text('click to play again', width / 2, height / 2 + 40);
  Erase();
}


