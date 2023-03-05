let scl = 1
let particle =[], particle_black = []
let cols, rows;
let colorPixel, colorPixel_black,alpha_channel, colorPixel_original;
let ball_factor = true
let blackOrWhite = false
let slideropacity, sliderscale, tresholdscale, brightness_scale, ball_percent, saturation_scale, jump_scale
let my_background;


function preload(){
  portrait = loadImage('images/bw.jpg');
  my_background = loadImage('images/backgrounds/background.jpg');

 
}

function setup() {
  let p_opacity = createP('OPACITY');
  p_opacity.style('font-size', '16px');
  p_opacity.position(0, 1000);
  slideropacity = createSlider(1, 258, 150);
  slideropacity.position(0, 1050);
  slideropacity.style('min', '80px');
  
  
  let p_scale = createP('SCALE');
  p_scale.style('font-size', '16px');
  p_scale.position(250, 1000);
  sliderscale = createSlider(1, 5, 1);
  sliderscale.position(250, 1050);
  sliderscale.style('min', '80px');
  
  let p_treshold = createP('TRESHOLD');
  p_treshold.style('font-size', '16px');
  p_treshold.position(500, 1000);
  tresholdscale = createSlider(-2, 256, 110);
  tresholdscale.position(500, 1050);
  tresholdscale.style('min', '80px');
  
  let p_brightness_scale = createP('BRIGHTNESS');
  p_brightness_scale.style('font-size', '16px');
  p_brightness_scale.position(750, 1000);
  brightness_scale = createSlider(-255, 256, 0);
  brightness_scale.position(750, 1050);
  brightness_scale.style('min', '80px');
  
  
  let p_ball_percent = createP('BALL PERCENT');
  p_ball_percent.style('font-size', '16px');
  p_ball_percent.position(0, 1100);
  ball_percent = createSlider(0, 200, 0);
  ball_percent.position(0, 1150);
  ball_percent.style('min', '80px');
  
  let p_saturation = createP('SATURATION');
  p_saturation.style('font-size', '16px');
  p_saturation.position(250, 1100);
  saturation_scale = createSlider(-255, 255, 0);
  saturation_scale.position(250, 1150);
  saturation_scale.style('min', '80px');
  
  let p_jump = createP('JUMP DISTANCE');
  p_jump.style('font-size', '16px');
  p_jump.position(500, 1100);
  jump_scale = createSlider(5, 255, 100);
  jump_scale.position(500, 1150);
  jump_scale.style('min', '80px');
  
  
  pixelDensity(1);
  frameRate(200)
  noiseSeed(208);
  //1501,1450.15010(best campiturar),17121
  randomSeed(99);
  
  c = createCanvas(portrait.width, portrait.height);
  colorMode(HSB,255)
  
  cols = floor(width/scl);
  rows = floor(height/scl)
  colorPixel = new Array(cols*rows)
  alpha_channel = new Array (cols * rows)


  let myCol;
  let cg = 50;
  
  for(let y = 0; y< rows; y++){
    for(let x = 0; x< cols; x++){
      let mycol = color(portrait.get(x*scl,y*scl))
        let index = x+y*cols;
        fill(mycol)
        colorPixel[index]=brightness(mycol)
        alpha_channel[index] = mycol.hsba[3] > 0 ? 100 : 0;
     // if(alpha_channel[index] >0){
       // push()
        //noStroke()
        //fill(0)
        //translate(x,y)
        //rect(0,0,1,1)
        //pop()
      //}
      
        if ((colorPixel[index] >100) && (cg>1)){
          //particle.push(new Particle(x*scl ,y*scl, colorPixel, scl, cols,rows))
          cg--

        }          

        stroke(255)
        //rect(x*scl,y*scl,scl,scl)
      }
    }
  colorPixel_black = colorPixel
  colorPixel_original = colorPixel
  
  background(0);

}

  

function draw() { 
  

  
  for(let i = 0; i< particle.length; i++){
    
    particle[i].update();
    if (particle[i].countTry<1){
      particle.splice(i, 1)
    } else {
      particle[i].seek();
      particle[i].display();
    }

  }
  
  for(let i = 0; i< particle_black.length; i++){
    
    particle_black[i].update();
    if (particle_black[i].countTry<1){
      particle_black.splice(i, 1)
    } else {
      particle_black[i].seek();
      particle_black[i].display();
    }

  }

}

function keyPressed() {

  if (key == 'e'){
    saveCanvas(c, 'myCanvas', 'jpg');
    print('salvato')
  }
  if (key == 'r'){
    particle = []
    particle_black = []
  }
  if(key=='f'){
    if(blackOrWhite== false){
    
    for (let i = 0; i< 500; i++){
        particle.push(new Particle(floor(random(width)) ,floor(random(height)), colorPixel, scl, cols,rows, ball_factor, slideropacity.value(), sliderscale.value(), tresholdscale.value(), brightness_scale.value(), ball_percent.value(), saturation_scale.value(),alpha_channel, jump_scale.value()))

    } }else{
      
       for (let i = 0; i< 500; i++){
        particle_black.push(new ParticleBlack(floor(random(width)) ,floor(random(height)), colorPixel, scl, cols,rows, ball_factor,sliderscale.value(),tresholdscale.value(),alpha_channel, jump_scale.value()))
      
    }
  }}
    
      if(key=='g'){
    
    for (let i = 0; i< 25; i++){
      let xtmp = floor(mouseX + random(-100,100))
      let ytmp = floor(mouseY + random(-100,100))
      let index = floor(xtmp) + floor(ytmp) * cols;
      if(blackOrWhite== false){
     
        particle.push(new Particle(xtmp ,ytmp, colorPixel, scl, cols,rows, ball_factor, slideropacity.value(), sliderscale.value(),tresholdscale.value(),  brightness_scale.value(), ball_percent.value(), saturation_scale.value(),alpha_channel, jump_scale.value()))
        
      }else{
       
        particle_black.push(new ParticleBlack(xtmp ,ytmp, colorPixel, scl, cols,rows, ball_factor,sliderscale.value(),tresholdscale.value(),alpha_channel, jump_scale.value()))
      

    }
    }}
  
  if(key=='b'){
    
   ball_factor= !ball_factor

    }
  
  if(key=='s'){
    blackOrWhite=!blackOrWhite
    console.log(blackOrWhite)
  }
  
  if(key=='a'){
    colorPixel = colorPixel_original
    colorPixel_black = colorPixel_original
    console.log('RESET pixel value')
  }
    

 

}

function mousePressed(){

if(blackOrWhite== false){
  particle.push(new Particle(floor(mouseX) ,floor(mouseY), colorPixel, scl, cols,rows, ball_factor, slideropacity.value(), sliderscale.value(),tresholdscale.value(),  brightness_scale.value(), ball_percent.value(), saturation_scale.value(),alpha_channel, jump_scale.value()))

} else {
    particle_black.push(new ParticleBlack(floor(mouseX) ,floor(mouseY), colorPixel, scl, cols,rows, ball_factor,sliderscale.value(),tresholdscale.value(),alpha_channel, jump_scale.value()))

}


      
}


  
  
  
  
  

