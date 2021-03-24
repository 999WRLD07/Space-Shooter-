var jet, jetImage, background, backgroundImage;
var npjet, npjetImage, npjet2, npjetImage2, npjet3, npjetImage3;
var fireGroup;
var fire, firImage, explosion, explosionImage;
var expoSound, bgSound, fireSound;
var np_shoot1Group, np_shoot2Group;
var score = 0;
var lives = 5;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameOverImage;
var gameOverSound;
var left, leftImage, right, rightImage;

function preload() {
    expoSound = loadSound("explosion.mp3")
    backgroundImage = loadImage("BG.png")
    jetImage = loadImage("jet.png")
    npjetImage = loadImage("npjet.png")
    explosionImage = loadImage("exp.png")
    fireImage = loadImage("fire.png");
    bgSound = loadSound("rocketthruster.mp3")
    gameOverImage = loadImage("gameOver.jpg");
    gameOverSound = loadSound("gameOverSound.mp3");

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    edges = createEdgeSprites();
    jet = createSprite(windowWidth / 2, windowHeight - 100)
    jet.addImage(jetImage)
    jet.scale = 0.5

    npjet = createSprite(-10, random(80, 170))
    npjet.velocityX = +3
    npjet.addImage(npjetImage)
    npjet.scale = 0.3

    npjet2 = createSprite(windowWidth, random(80, 170))
    npjet2.velocityX = -3
    npjet2.addImage(npjetImage)
    npjet2.scale = 0.3

    fireGroup = new Group();
    np_shoot1Group = new Group();
    np_shoot2Group = new Group();

}

function draw() {
    background(backgroundImage);
    textSize(30);
    fill("cyan")
    text("SCORE ⛳ : " + score, windowWidth - 250, 50)
    text("LIVES ❤ : " + lives, 50, 50);
    if (gameState == PLAY) {
        if (keyDown("space")) {
            jet.velocityX = -8
        }

        jet.bounceOff(edges[0])
        jet.bounceOff(edges[2])
        jet.bounceOff(edges[3])


        if (keyDown("space") || touches > 0) {
            if (frameCount % 10 == 0) {
                fire = createSprite(jet.x, jet.y, 10, 10)
                fire.addImage(fireImage)
                fire.scale = 0.005
                fire.velocityY = -15
                fireGroup.add(fire);
                touches = []
            }
        }

        if (npjet.isTouching(fireGroup)) {
            explosion = createSprite(npjet.x, npjet.y)
                //  expoSound.play()
            explosion.lifetime = 10
            explosion.addImage(explosionImage)
            npjet.x = -10
            console.log("explosion detection")
            fireGroup.destroyEach()
            score = score + 5
        }

        if (npjet2.isTouching(fireGroup)) {
            explosion = createSprite(npjet.x, npjet.y)
                //  expoSound.play()
            explosion.lifetime = 10
            explosion.addImage(explosionImage)
            npjet2.x = 610
            console.log("explosion detection");
            fireGroup.destroyEach()
            score = score + 5
        }
        drawSprites()
        enemy_shoot1()

        npjet.bounceOff(edges[0])

        npjet.bounceOff(edges[1])
        npjet.bounceOff(edges[2])
        npjet.bounceOff(edges[3])

        // jet.bounceOff(edges[0])



        if (jet.isTouching(np_shoot1Group) || jet.isTouching(np_shoot2Group)) {
            explosion = createSprite(jet.x, jet.y)
                // expoSound.play()
            explosion.lifetime = 10
            explosion.addImage(explosionImage)
            console.log("explosion detection")
            np_shoot2Group.destroyEach();
            np_shoot1Group.destroyEach();

            lives = lives - 1

        }
        if (lives < 1) {

            gameState = END
        }


    } else if (gameState == END) {

        image(gameOverImage, 0, 0, windowWidth, windowHeight)
            //   gameOverSound.play()
            // textSize(50)
            // text("Game Over")


    }

}

function enemy_shoot1() {
    if (frameCount % 100 == 0) {
        np_shoot1 = createSprite(npjet.x, npjet.y)
        np_shoot1.velocityY = +7
        np_shoot1.mirrorY(-1)
        np_shoot1.addImage(fireImage)
        np_shoot1.scale = 0.005
        np_shoot2 = createSprite(npjet2.x, npjet2.y)
        np_shoot2.velocityY = +7
        np_shoot2.mirrorY(-1)
        np_shoot2.scale = 0.005
        np_shoot1Group.add(np_shoot1)
        np_shoot2Group.add(np_shoot2)

    }
}