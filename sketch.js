var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, stoneImg, gameOverImg;
var foodGroup, obstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    obstacles();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
   

  }

  if(gameState === END){
    stroke("red");
    textSize(30);
    fill("red");
    text("Game Over",300,200);

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    foodGroup.setVelocityX(0);
    obstacleGroup.setVelocityX(0);

    player.addAnimation("gameOver",gameOverImg);
    player.scale = 0.5;
    player.x=250;
    player.y=200;



  }

  drawSprites();

  stroke("white");
  text(30);
  fill("white");
  text("score : "+score,450,50);
}

function spawnFood(){

  if(frameCount % 180 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount%300===0){
    var obstacle  = createSprite(900,315,10,10);
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.addImage(stoneImg);
    
    obstacleGroup.add(obstacle);
  }
}
