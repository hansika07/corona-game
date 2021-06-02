var man;
var ground;
var injectionGroup;
var virusGroup;
function preload() {
  bgImg = loadImage("bg.png");
  manImg = loadAnimation("Images/run1.png", "Images/run2.png", "Images/run3.png",
    "Images/run4.png", "Images/run5.png", "Images/run6.png", "Images/run7.png",
    "Images/run8.png", "Images/run9.png", "Images/run10.png", "Images/run11.png", "Images/run12.png",
    "Images/run14.png", "Images/run15.png", "Images/run16.png", "Images/run17.png",
    "Images/run18.png", "Images/run19.png", "Images/run20.png");
  injectionImg = loadImage("injection.png");
  manStandingImg = loadAnimation("Images/idle.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  man = createSprite(50, displayHeight - 70, 20, 60);
  man.addAnimation("manImg", manImg);
  man.scale = 0.25;

  ground = createSprite(200, displayHeight - 20, width, 10);
  ground.visible = false;
  injectionGroup = createGroup();
  virusGroup = createGroup();
}

function draw() {
  background(bgImg);
  if (keyDown("space")) {
    injection();
  }
  if (keyDown(UP_ARROW)) {
    man.y -= 5;
    man.changeAnimation("manStandingImg", manStandingImg);
  }
  if (keyDown(DOWN_ARROW)) {
    man.y += 5;
  }
  if (injectionGroup.isTouching(virusGroup)) {
    virusGroup.destroyEach();
    injectionGroup.destroyEach();
  }
  //man.velocityY = man.velocityY + 0.8;
  spawnVirus();
  drawSprites();
}

function injection() {
  var injection = createSprite(man.x + 30, man.y);
  injection.addImage(injectionImg);
  injection.scale = 0.05;
  injectionGroup.add(injection);
  injection.velocityX = 10;
}

function spawnVirus() {
  if (frameCount % 60 === 0) {
    var virus = createSprite(displayWidth, 300);
    virus.velocityX = -5;
    virusGroup.add(virus);
    virus.lifetime = displayWidth / 5 + 100;
    virus.y = Math.round(random(100, displayHeight - 100));
  }
}