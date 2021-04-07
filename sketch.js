var ground,background1Img,background1
var monkey , monkey_running, monkeyimg
var banana ,bananaImage,  bananaGroup
var obstacle, obstacleImage,obstacleGroup

var score=0
var survivalTime=0
var gameState="play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  background1Img=loadImage("WhatsApp Image 2021-03-18 at 20.42.25.jpeg")
 monkeyImg=loadAnimation("sprite_0.png")
}
function setup() {
 createCanvas(600,350)
  
background1=createSprite(300,175,20,20)
background1.addImage(background1Img)
//background1.scale=0.9
background1.velocityX=-1

  
monkey=createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running)
monkey.addAnimation("run",monkeyImg)
monkey.scale=0.1
  
ground=createSprite(400,335,900,10)
//ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x)
ground.visible=false
  
bananaGroup= new Group ()
obstacleGroup =new Group ()
}

function draw() {
background("lightgray")
  monkey.collide(ground)
  if(gameState==="play"){
  
if(keyDown("space"))  {
    monkey.velocityY = -12; }
  monkey.velocityY = monkey.velocityY + 0.8
  
 ground.x=ground.width/2; 
 
    survivalTime=Math.ceil(frameCount/frameRate())
    
  if(background1.x<100 ){
background1.x = background1.width/2;
  }
  
   //calling
  food();
  obstacles();
    
    
if(bananaGroup.isTouching(monkey)) {
  score=score+2
  bananaGroup.destroyEach()
}
    
   if(obstacleGroup.isTouching(monkey))
    {gameState="end"}  
    
  }
  
  

  if(gameState==="end"){
background1.velocityX=0
monkey.changeAnimation("run",monkeyImg)
  bananaGroup.setVelocityEach(0,0)
  obstacleGroup.setVelocityEach(0,0)
bananaGroup.destroyEach()
obstacleGroup.destroyEach()
text("Game Over",200,300)
  }
 
  
 drawSprites() 
  
stroke("white")
textSize(20)
fill("white")
text("Score: "+ score,500,50)
  
stroke("black")
textSize(20)
fill("black")
text("Survival Time : "+ survivalTime,100,50)
}

function food(){
if(frameCount % 80 === 0) {
banana = createSprite(600,165,10,40);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage)
banana.velocityX=-4
banana.lifetime=600
banana.scale=0.1

bananaGroup.add(banana)
}
  
}

function obstacles(){
if(frameCount%300===0){
 obstacle=createSprite(510,315,10,10) 
obstacle.addImage(obstacleImage)
obstacle.velocityX=-5
obstacle.lifetime=600
obstacle.scale=0.2
  
obstacleGroup.add(obstacle) 
}  
  
  
}

