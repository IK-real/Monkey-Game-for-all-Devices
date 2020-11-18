
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var time = 0
var ground;
var PLAY = 1;
var END =0;
var gameState = PLAY;
var restart;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_crash = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  
  reImage = loadImage("restart.png")
}



function setup() {
 createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(40,windowHeight - 300,10,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("crash", monkey_crash);
  monkey.scale = 0.13;

  
  ground = createSprite(windowWidth/2,windowHeight - 200,700,10);
  ground.addImage(groundImage);
  ground.scale = 0.5
  ground.setCollider("rectangle",0,0,4100,600)
  
  
  restart = createSprite(windowWidth/2,windowHeight/2,10,50);
  restart.addImage(reImage);
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
 background("cyan");
   
  text("score:  " + score, windowHeight - 23,15)
  text("survivalTime:  " + time, 350, 15)
  
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(ground.x <=400){
       ground.x = windowWidth/2 
   }
  
 if(gameState === PLAY){ 
 
       if(frameCount % 20 === 0){
         time = time+1 
       }
   
     ground.velocityX = -3;
         
      restart.visible = false;   
    if(touches.length > 0 && monkey.y >= windowHeight - 400 || keyDown("space")&& monkey.y >= windowHeight - 400){
      monkey.velocityY = -13;
      touches = [];
    }
     var M = monkey.y;
     text(M,200,15);

    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score+1;
    }
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      monkey.changeAnimation("crash", monkey_crash);
    } 
  
  banana();
  stones();
 }
  
  if(gameState === END){
    
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    restart.visible = true;
    
    ground.x = windowWidth/2;
    
     if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart) ) {      
      reset();
      touches = []
    }
  }
  drawSprites();
  
}

function banana(){
  if(frameCount % 160 === 0){
    var banana = createSprite(505,Math.round(random(windowHeight - 500, windowHeight - 380)),10,10);
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function stones(){
  if(frameCount % 270 ===0){
    var stone = createSprite(505,windowHeight - 380,10,50);
    stone.addImage(obstacleImage);
    stone.scale = 0.13;
    stone.lifetime = 200;   
    stone.velocityX = -5;
    stone.setCollider("circle",0,0,100);
    obstacleGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("running" , monkey_running);
  score = 0;
  time = 0;
  
}



