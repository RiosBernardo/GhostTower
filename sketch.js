var torre, imagemTorre
var imagemPorta
var imagemCerca
var fantasma, imagemFantasma
var estadoJogo = "inicial"
var grupoInvisivel, grupoCerca, grupoPorta


function criarPorta() {
  
  if (frameCount % 200 === 0) {
    var porta = createSprite (300, -50, 50, 50)
    porta.velocityY = 2;
    porta.x = Math.round (random (100, 500))
    porta.addImage (imagemPorta)
    porta.lifetime = 600

    var cerca = createSprite (300, 10, 50, 50)
    cerca.velocityY = 2
    cerca.x = porta.x  
    cerca.addImage (imagemCerca)
    cerca.lifetime = 600

    var cercaInvisivel = createSprite (300, 12, 50, 2)
    cercaInvisivel.velocityY = 2
    cercaInvisivel.x = porta.x  
    cercaInvisivel.lifetime = 600
    cercaInvisivel.visible = false

    fantasma.depth = porta.depth 
     //   fantasma.depth = cerca.depth 
    fantasma.depth = fantasma.depth + 1

    grupoInvisivel.add (cercaInvisivel) 
    grupoCerca.add (cerca)
    grupoPorta.add (porta)
  }
}

function preload(){
  imagemTorre = loadImage ("tower.png")
  imagemPorta = loadImage ("door.png")
  imagemCerca = loadImage ("climber.png")
  imagemFantasma = loadImage ("ghost-standing.png")
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  torre = createSprite (300, 300, 600, 600)
  torre.addImage (imagemTorre)
  torre.velocityY = 2;
  fantasma = createSprite (300, 300, 50, 50)
  fantasma.addImage (imagemFantasma)
  fantasma.scale = 0.3
  somAssustador.loop();
  grupoInvisivel = new Group () 
  grupoCerca = new Group ()
  grupoPorta = new Group ()
}

function draw(){
  background (0)
  
  
  if (estadoJogo === "inicial") {
    if (keyDown ("space")) {
      estadoJogo = "jogando"
    }    
      
  } else if (estadoJogo === "jogando") {
    if (keyDown ("left_arrow")) {
      fantasma.x = fantasma.x - 5       
    }
  
    if (keyDown ("right_arrow")) {
      fantasma.x = fantasma.x +5       
     }
  
    if (keyDown ("space")) {
      fantasma.velocityY = -10     
     }
     fantasma.velocityY = fantasma.velocityY + 0.3
  
  
    if (torre.y > 400) {
      torre.y = 300

    }
    if (fantasma.isTouching (grupoInvisivel) || fantasma.y > 600) {
      estadoJogo = "fim"
      fantasma.destroy ()
      grupoPorta.setVelocityYEach (0)
      grupoCerca.setVelocityYEach (0)
    }
    fantasma.collide (grupoCerca)
    if (grupoCerca.isTouching (fantasma)) {
      fantasma.velocityY = 0;

    }
    criarPorta()
    } else if (estadoJogo === "fim") {
      torre.velocityY = 0;
      textSize (40)
      text ("Game Over", 280, 300)
      torre.destroy ()
    }
    drawSprites ()
  

}
// ||