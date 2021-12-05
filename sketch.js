var bg,bgImg,bgImg2;
var player,playerRunning,playerShoot;
var badRobo,badImg;
var shootImg,shoot;
var bullet = 50;
var EnemiesKilled = 0;

function preload()
{
  bgImg         = loadImage("destroyed background.jpg");
  bgImg2        = loadImage("destroyed background - Copy.jpg");
  playerRunning = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png",)
  playerShoot   = loadAnimation("RunShoot (1).png","RunShoot (2).png","RunShoot (3).png","RunShoot (4).png","RunShoot (5).png","RunShoot (6).png","RunShoot (7).png","RunShoot (8).png","RunShoot (9).png")
  badImg        = loadAnimation("robot1.png","robot2.png","robot3.png","robot4.png","robot5.png")
  shootImg      = loadAnimation("Bullet_000.png","Bullet_001.png","Bullet_002.png","Bullet_003.png","Bullet_004.png")
}




function setup() 
{
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/1-200,displayHeight/1-350,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  bg.velocityX = -4;

  player = createSprite(displayWidth-800, displayHeight-380, 50, 50);
  player.addAnimation("Shoot",playerRunning)
  player.addAnimation("Bullet",playerShoot)

  player.scale = 0.7


  obstaclesGroup = new Group();
  bulletGroup = new Group()
  
}

function draw() 
{
  background(0);  
if(bg.x < 800)
{
  bg.x = bg.width/2;
}


if(keyWentDown("space") )
{

  player.addAnimation("Shoot",playerShoot)
  shoot = createSprite(displayWidth-650,player.y-1,20,10)
  shoot.addAnimation("Bullet",shootImg)
  shoot.velocityX = 20;
  shoot.scale = 0.5;
  bulletGroup.add(shoot);  
  player.depth = shoot.depth
  player.depth = player.depth+2
  bullet = bullet-1;
  
}
else if(keyWentUp("space"))
{
  player.addAnimation("Shoot",playerRunning)
}


if(obstaclesGroup.isTouching(bulletGroup)){
  for(var i=0;i<obstaclesGroup.length;i++){     
      
   if(obstaclesGroup[i].isTouching(bulletGroup)){
        obstaclesGroup[i].destroy()
        bulletGroup.destroyEach()
 
        EnemiesKilled = EnemiesKilled+1
        } 
  }
}



spawnObstacles();
  drawSprites();
  textSize(50)
  fill("red")
text("Bullets Left = " + bullet,displayWidth-1300,displayHeight/2-300)
text("Enemies Killed = " + EnemiesKilled,displayWidth-1300,displayHeight/2-230)

  
}


function spawnObstacles() {
  if(frameCount % 50 === 0) {

    badRobo = createSprite(camera.position.x+800,displayHeight-360,50,50);
    badRobo.addAnimation("BAD",badImg);
    badRobo.scale = 3;
    badRobo.velocityX = -6

    badRobo.lifetime = 1004;
    obstaclesGroup.add(badRobo);
    
  }
}
