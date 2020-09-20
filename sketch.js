//declaring global variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup

var score;
var survivalTime = 0;
var ground;

function preload(){
  
  //loading images to the sprites
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  staticImage = ("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //creating the game area
  createCanvas(400,400);
  
  //creating the monkey and adding animation to it
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle")
  //monkey.debug = true;
  
  //creating the ground
  ground = createSprite(200,350,800,5);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group(); 
  
  score = 0;
}


function draw() {

  background(0,225,0);

  //making the monkey jump if space is pressed
  if (keyDown("space") && monkey.y > 200){
    monkey.velocityY = -12; 
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*survivalTime/100);
  text("Survival time : " + survivalTime,50,50);
  
  stroke("black");
  textSize(20)
  fill("black");
  text("Score : " + score, 250,50)   
    
  //adding gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //making the ground move infinitely
  if (ground.x < 0){
    ground.x = 200;
  }
  
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  

  if (score >= 100){
    score = score + 0;
    monkey.destroy();
    ground.destroy();
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    fill("black");
    text("You Win" +"You are an awesome gamer",200,200);
  }
    
  //making the monkey stop if it touches the obstacle
  if (obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.destroyEach();
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
  }
    
  //making the monkey stay on the ground
  monkey.collide(ground);
  
  //calling the functions so that they can be executed
  food();
  obstacles();
  
  drawSprites();

}

//creating the function for dispalying bananas
function food(){
  if (frameCount % 80 === 0){
    var banana = createSprite(400,250,30,50);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.lifetime = 100;
    foodGroup.add(banana);
    banana.debug = true;
  } 
}

//creating function for displaying obstacles
function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,320,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -4;
   obstacle.lifetime = 100;
   obstacleGroup.add(obstacle);
   
 }
}