
var car;
var z,rand,t,gar;
var score=0;
var lifes=4;
var play=1;
var end=0;
var end2=2;
var gamestate=play;
var gameover,resets;
var bullets=2;
function preload(){

//adding the images and the sounds

  carimg=loadImage("images/car.png");
  bimg=loadImage("images/background_edited.jpg");
  bimg2=loadImage("images/background 2.jpg");
trimg=loadImage("images/track.jpg");


z1=loadImage("images/z9.png");
z2=loadImage("images/zombie 2.png");
z3=loadImage("images/z19.png");
z4=loadImage("images/zombie 4.png");
z5=loadImage("images/z0.png");

g1=loadImage("images/g3.png");
g2=loadImage("images/g6.png");
g3=loadImage("images/garbage1.png");
g4=loadImage("images/waste.png");
bin=loadImage("images/dustbingreen.png");
over=loadImage("images/over.png")
reset=loadImage("images/reset.png")
l=loadImage("images/last.png");


bsound=loadSound("sounds/background.mp3");
gunsound=loadSound("sounds/shot.wav");
z1sound=loadSound("sounds/zombie attacked.mp3");
z2sound=loadSound("sounds/zombie coming.mp3");
}









function setup(){
//making the canvas
  canvas=createCanvas(1800,600);

// making the car  
car=createSprite(200,430,100,100);
car.addImage(carimg);
car.scale=0.6;
//creating various groups gor garbage , zombies and bullets
zgroup=createGroup();
tgroup=createGroup();
gargroup=createGroup();


}

function draw(){
   
  background(bimg);  
//making the track image
  image(trimg,-500,550,displayWidth*20,60);

//adding the conditions for the gamestate
if(gamestate===play){



//adding velocity for the car
  if(keyWentDown(RIGHT_ARROW)){
    car.velocityX=10;
     }
   if(keyWentUp(RIGHT_ARROW)){
    car.velocityX=0;
   }


  




//destroying the zombies when bullets touch them
  for(var i =0; i< zgroup.length; i++)
  {
     if(zgroup.get(i).isTouching(tgroup))
     {
         zgroup.get(i).destroy();
         score=score+1;
        z1sound.play();
            
     }
  }


//reducing the life of the player
  for(var i =0; i< zgroup.length; i++)
  {
     if(zgroup.get(i).isTouching(car))
     {
         zgroup.get(i).destroy();
         lifes=lifes-1;
        
            
     }
  }


 //adding the conditions for the garbage group 
  for(var i =0; i< gargroup.length; i++)
  {
     if(gargroup.get(i).isTouching(car))
     {
         gargroup.get(i).velocityX=car.velocityX;
        
         
     }
  }
 

//making the game over  
if(lifes===0){
gamestate=end2;

}
  
//making various functions appear
  garbage();
  bullet();
  zombies();


  
//telling when is the endstate
if(score===12){

  gamestate=end;
}

//play state ends here
}
   

//adding the conditions for the end  state
if(gamestate===end){

  //making the dustbin 
dust=createSprite(car.x+700,482,20,20);
dust.debug=true;
dust.scale=0.6;
dust.addImage(bin);
car.velocityX=0;
last=createSprite(car.x+230,140,20,20);
last.addImage(l);
//adding the new background and making the velocity of the garbage 0 when it touches to the dustbin
if(gargroup.isTouching(dust)){
  gargroup.pointToEach(car.x+500,492);
gargroup.setVelocityXEach(0);
background(bimg2);
text("Thanks!For playing the game",200,200);
}


//gamestate ends here

}


if(gamestate===end2){
 gameover=createSprite(car.x+300,300,10,10);
 gameover.addImage(over);
 
 car.velocityX=0;
 
}






//adding the gamecamera
camera.position.x=car.x;
console.log(gamestate);
drawSprites();


//adding the texts

textSize(30);
fill("black");
text("score-"+score,car.x,100);

textSize(30);
fill("black");
text("life-"+lifes,car.x+500,100);

textSize(40);
fill("red");
text("use UP arrow to fire",700,200);


textSize(40);
fill("red");
text("use right arrow to move the car ",10,200);




}






//making functions for zombies , bullets and garbage

function zombies(){

if(frameCount%200===0){
  z=createSprite(car.x+800,449,10,10);
  
z.velocityX=-3;
var rand = Math.round(random(1,3));
z.scale=0.6;
if(score>4){
  z.velocityX=z.velocityX-8;

}

if(score>7){
  z.velocityX=z.velocityX-6;

}

if(score>10){
  z.velocityX=z.velocityX-10;

}
z2sound.play();
switch(rand){
    case 1: z.addImage(z1);
    break;
    case 2: z.addImage(z3);
    break;
    case 3: z.addImage(z5);
    break;
    
    default:
    break;
}
zgroup.add(z);
}

} 

function bullet(){
  if(keyDown(UP_ARROW)){
    
    
    t=createSprite(car.x+200,315,10,10);
    
    t.velocityX=car.velocityX+15;
    
    tgroup.add(t);
    gunsound.play();

   }
}




function garbage(){

if(frameCount%250===0){
  gar=createSprite(car.x+280,540,10,10);
  gar.scale=0.3;
  var rand = Math.round(random(1,3));
  switch(rand){
    case 1: gar.addImage(g1);
    break;
    case 2: gar.addImage(g2);
    break;
    case 3: gar.addImage(g3);
    break;
    default:
    break;
}  
gargroup.add(gar);
}
}

function resetgame(){
  gamestate=play;
  gargroup.destroyEach();
  zgroup.destroyEach();
  score=0;
  lifes=4;
  gameover.scale=0.001;
}


