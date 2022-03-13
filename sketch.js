var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  spookySound.setVolume(0.1);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group()
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
}

function draw() {
  background(0);
  if(gameState === "play"){
    
  if(tower.y > 400){
      tower.y = 300
    }
  
  if(keyDown("left_arrow")){
    ghost.x -= 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x += 3;
  }

  if(keyDown("space")){
    ghost.velocityY = -8;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  ghost.velocityY +=0.8;

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }

  spawnDoors();
  drawSprites()
  }
  if(gameState === "end"){
    fill("yellow");
    textSize(45);
    textFont("Georgia"); 
    text("Game Over", 180, 300);
  }
}
function spawnDoors(){
  if(frameCount%240 === 0){
    door = createSprite(Math.round(random(120, 460)), -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(door.x, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x,15, climber.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;
  }

}