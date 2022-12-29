var gun, gunImg;
var bullet, bulletImg, bulletGroup;
var bat, batAnimation, endAnimation, batGroup;
var PLAY = 1
var END = 0
var gameState = PLAY
var wall, score, gameOver, gameOverImg

function preload(){
    gunImg = loadImage("gun.png");
    bulletImg = loadImage("bullet.png");
    gameOverImg = loadImage("gameover.png");
    batAnimation = loadAnimation("bat1.png", "bat2.png", "bat3.png", "bat4.png");
    endAnimation = loadAnimation("bat1.png");
}

function setup() {
    createCanvas(600, 600);
    gun = createSprite(50, 300);
    gun.addImage("gun", gunImg);
    gun.scale = 0.6;
    batGroup = new Group();
    bulletGroup = new Group();
    wall = createSprite(10, 0, 20, 600)
    wall.visible = false
    score = 0;
    gameOver = createSprite(300, 300)
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.scale = 1.0
    gameOver.visible = false

    

}

function draw() {
    background("pink")
    drawSprites()

    text("Score: "+ score, 540,20);
    
    if(gameState == PLAY){
        
        gun.y = World.mouseY
    
    if(keyWentDown("SPACE")){
        shoot() 
    }
    
    if(World.frameCount % 60 == 0){
        spawnBat();
    }
   
    if(bulletGroup.isTouching(batGroup)){
        score = score + 5
        batGroup[0].destroy();
        
    }

    if(batGroup.isTouching(wall)){
        gameState = END
    }

    if(gameState == END){
        batGroup.destroyEach()
        gameOver.visible = true


    }

}
}

function shoot() {
    bullet = createSprite(110, gun.y - 23);
    bullet.addImage("bullet", bulletImg);
    bullet.scale = 0.1
    bullet.velocityX = 10
    bullet.lifetime = 60
    bulletGroup.add(bullet);
}

function spawnBat() {
    bat = createSprite(570, Math.round(random(40, 560)))
    bat.velocityX = -(5 + score/7);
    bat.lifetime = 140
    bat.scale = 1.0
    bat.addAnimation("flying", batAnimation);
    batGroup.add(bat)

}



