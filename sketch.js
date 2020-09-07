var PLAY=0, END=1
var gameState=PLAY
    
var monkey , monkey_running
var banana, bananaImage, obstacle, obstacleImage
var BananaGroup, rockGroup
var survivalTime
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey=createSprite(70,450,20,20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale=0.2
  
  ground=createSprite(400,450,1000,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  
  BananaGroup= createGroup();
  rockGroup= createGroup();
  
  score=0;
}


function draw() {
  background("lightGray");
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  
  if(gameState===PLAY) {
     monkey.collide(ground);
    
     banana();
     obstacle();
    
    if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY=-12
    }
    monkey.velocityY=monkey.velocityY+1
    
    if(ground.x < 0) {
    ground.x=ground.width/2;
  }
   if(rockGroup.isTouching(monkey)) {
     gameState=END;
     monkey.velocityY=0;
     ground.velocityX=0;
     rockGroup.setVelocityXEach(0);
     BananaGroup.setVelocityXEach(0);
     rockGroup.setLifetimeEach(-1);
     BananaGroup.setLifetimeEach(-1);
     survivalTime=0;
   }
  }
 
  
  drawSprites();
}

function banana(){
  if (frameCount % 80 === 0){
    var banana=createSprite(200,100,10,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-3;
    banana.lifetime=62;
    BananaGroup.add(banana);
  }
}
function obstacle(){
  if(frameCount%110===0) {
  rock=createSprite(400,400,10,10)
  rock.velocityX = -4
  rock.addImage(obstacleImage)
  rock.scale=0.15
  rock.lifetime=100;
  rockGroup.add(rock);
    
  }
  
}