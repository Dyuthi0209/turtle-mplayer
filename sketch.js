var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var player, form,game;
var player1,player2;
var players;
var player_img;
var score=0;
var obstacle,obGroup;
var play=1;
var end=2;
var gameOver, gameOverImg;
var invisiblePlat, invisiblePlat2;
var restart, restartImg;
var up, upImg;
var down, dowmImg,bgImg;
var turtle,turtleImg,playbutton,playbuttonImg,input,inputImg,hat1,hat2,hatImg;
var octopus, eel, stingray, urchin, lionfish, blowfish, swordfish, pfish, shark;

function preload(){
  back_img = loadImage("images/bg.jpg");
 
  bgImg = loadImage("images/background.png");
  hatImg = loadImage("images/hat.png");

 octopus=loadAnimation("images/octopus.gif")
 shark=loadAnimation("images/shark.gif")
 eel=loadAnimation("images/eel-unscreen.gif")
 pfish=loadAnimation("images/fish.gif")
 swordfish=loadAnimation("images/swordfish.gif")
 lionfish=loadAnimation("images/lionfish.gif")
 blowfish=loadAnimation("images/blowfish.gif")
 stingray=loadAnimation("images/stingray-unscreen.gif")
 urchin=loadAnimation("images/urchin.gif")

 gameOverImg=loadImage("images/overbg.png")
 restartImg=loadImage("images/replay.png")

  turtleImg=loadImage("images/boxer_turtle.png");
  playbuttonImg=loadImage("images/startturtle1.png");
  inputImg=loadImage("images/input.png");

  
  player_img = loadImage("movingturle.gif");

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

 obGroup = new Group();

  
  gameOver=createSprite(500,200,10,50)
  gameOver.addImage("gameover",gameOverImg)
  gameOver.scale=0.7;
  
  restart=createSprite(500,420,10,50)
  restart.addImage("gameover",restartImg)
  restart.scale=0.7;

  turtle=createSprite(200,420,10,50)
  turtle.addImage("turtle",turtleImg)
  turtle.scale=0.7;
  
  playbutton=createSprite(650,500,10,50)
  playbutton.addImage("playbutton",playbuttonImg)
  playbutton.scale=0.23;

  input=createSprite(645,350,10,50)
  input.addImage("input",inputImg)
  input.scale=0.46;

  gameOver.visible=false;
 restart.visible=false;
 
}
function draw() {
  background(back_img);
  
if(gameState==0){
  gameOver.visible=false;
  restart.visible=false;
}

   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear();   
     game.play();
     player1.visible=true;
     player2.visible=true;

    gameOver.visible=false;
    restart.visible=false;
   }
   if (gameState === 2 ) {
    game.end();

    //restart.visible=false;      

    player1.visible=false;
    player2.visible=false;

    gameOver.visible=true;
    restart.visible=true;

 } 

 drawSprites();
}