var canW;
var canH;
var engine;
var world;
//variables for PC (Kate)
var kateIdle;
var kateJump;
var kateWalk;
var kateSword;
var kateShield;
var kateHammer;
var kateCharge;
//variables for NPC
var scene;
var ground;
var invisibleGround1;
var invisibleGround2;
var invisibleGround3;
var invisibleGroundGroup;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
//variables for console
var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload() {
    scene = loadImage("Assets/Scene1.png");
  
    kateIdle = loadAnimation("/Assets/KateSprites/KateIdle.png");
  
    kateWalk = loadAnimation("/Assets/KateSprites/KateWalk1.png","/Assets/KateSprites/KateWalk2.png","/Assets/KateSprites/KateWalk3.png","/Assets/KateSprites/KateWalk4.png");
    kateJump = loadAnimation("/Assets/KateSprites/KateJump1.png","/Assets/KateSprites/KateJump2.png","/Assets/KateSprites/KateJump3.png","/Assets/KateSprites/KateJump3.png","/Assets/KateSprites/KateJump2.png","/Assets/KateSprites/KateJump1.png");
    kateSword = loadAnimation("/Assets/KateSprites/KateSword1.png","/Assets/KateSprites/KateSword2.png","/Assets/KateSprites/KateSword3.png","/Assets/KateSprites/KateSword4.png","/Assets/KateSprites/KateSword5.png","/Assets/KateSprites/KateSword6.png");
    kateShield = loadAnimation("/Assets/KateSprites/KateShield.png");
  
    //load the image of enemy
    enemy1 = loadImage("Assets/Enemy1.png");
    enemy2 = loadImage("Assets/Enemy2.png");
    enemy3 = loadImage("Assets/Enemy3.png");
    enemy4 = loadImage("Assets/Enemy4_1.png");
    //enemy4 = loadAnimation("/Assets/Enemy4_1.png","/Assets/Enemy4_2.png");
  }

function setup() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(isMobile){
      canW = displayWidth;
      canH = displayHeight;
      createCanvas(displayWidth+80,displayHeight);
    } else {
      canW = windowWidth;
      canH = windowHeight;
      createCanvas(windowWidth,windowHeight);
    }
  
    //create the sprite of your character
    kate = createSprite(150,550,20,50);
    kate.addAnimation("idling",kateIdle);
    kate.addAnimation("jumping",kateJump);
    kate.addAnimation("walking",kateWalk);
    kate.setAnimation("idling");
  
    //adding scale and position to your character
    kate.scale = 0.1;
  
    //create invisible ground for each of the uneven surface
    invisibleGround1 = createSprite(30,580,100,340);
    invisibleGround2 = createSprite(150,580,950,20);
    invisibleGround3 = createSprite(400,550,160,40);
    invisibleGround1.visible = true;
    invisibleGround2.visible = true;
    invisibleGround3.visible = true;
  
    obstaclesGroup = new Group();

    //add sprite
    ground = createSprite(1280,570,256,32);
    //add image of the scene
    ground.addImage("scene1", scene);
  
    score = 0;
}

function draw() {
    background(200);
    drawSprites();

    if (keyIsDown(RIGHT_ARROW)) {
        kate.changeAnimation("walking");
        kate.x += 4;
        //ground.x -= 4;
      }

    if (keyIsDown(LEFT_ARROW)) {
        kate.changeAnimation("walking");
        kate.x -= 4;
        //ground.x += 4;
      }
      
    if (keyIsDown(UP_ARROW) && kate.y >= 500) {
      kate.changeAnimation("jumping");
      kate.velocityY = -12;
      }
    
    kate.velocityY += 7.5;

    //colide with the ground
    kate.collide(invisibleGround1);
    kate.collide(invisibleGround2);
    kate.collide(invisibleGround3);

    spawnEnemies();
} 

function spawnEnemies() {
    if (frameCount%50 === 0) {
      var obstacle = createSprite(500,550,10,40);
      obstacle.velocityX = -5;

      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(enemy1);
        break;
        case 2: obstacle.addImage(enemy2);
        break;
        case 3: obstacle.addImage(enemy3);
        break;
        default:break;
      }
    }
    obstaclesGroup.add(obstacle);
  }