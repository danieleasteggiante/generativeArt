
function Particle(x,y, colorPixel,scl, cols, rows, ball_factor,opacity, scale, treshold_val, brightness_my, ball_prob, saturation_val, alpha_channel, jump_distance) {
   this.area = width * height
  this.scale = scale
  
  this.ball_area_size = [3*scale,5*this.scale,8*this.scale,10*this.scale,12*this.scale,17*this.scale]
  
  
  
  
  this.ball_factor = ball_factor;
  this.location=createVector(x,y);
  this.velocity=createVector(1,1);
  this.target=undefined;
  this.maxspeed = 1;
  //this.image = image;
  this.treshold_gradient = [treshold_val,130,170,190,220,260]
  this.treshold_gradient_active = undefined
  this.circle_opacity = [20,30,50,70,90,100]
  this.circle_size = [1*this.scale,1*this.scale,1.2*this.scale,1.5*this.scale,1.8*this.scale,2*this.scale]
  this.alsoused=[];
  this.count= 0;
  this.scl=scl;
  this.cols=cols;
  this.rows = rows;
  this.storeMoved = [];
  this.treshold_distance = jump_distance;
  this.smooth= undefined;


  
  this.circle_size_tmp = this.circle_size

  this.ball_active= false
  
  this.countTry = 4;
  this.incOpacity=0.0
  this.incRadius=0.0
  this.palette = [[200,0,255],[140,150,150],[250,120,180],[50,90,120], [30,90,120], [255,90,120],  [160,90,120]]
  this.choice = random (0,60)
  
  if(this.choice <30){
      this.colour = this.palette[0]

  } else {
          this.colour = this.palette[floor(random(1,6.5))]

  }
  
  this.setTarget = function(){
    this.jump = false
    let neightboors = []
    try{
       neightboors = this.checkNeightboors(this.location.x,this.location.y);
      } catch (error) {
        console.error(error);
      }
    if(neightboors.length>0){
      this.target = createVector(neightboors[floor(random(neightboors.length))][0]*this.scl,neightboors[floor(random(neightboors.length))][1]*this.scl);
    
    } else {
    
      let possibleTarget = [];
    for(let i=0; i < colorPixel.length; i++){
      if(colorPixel[i] > this.treshold_gradient[0]){
        possibleTarget.push(i);
      }
    }
    if (possibleTarget.length > 0){
        
      
    let coordinates = [];
    try{
    let numberChoice = floor(random(possibleTarget.length));
    coordinates[1] = possibleTarget[numberChoice] / this.cols;
    coordinates[0] = possibleTarget[numberChoice] % this.cols;
      
    let d = dist(coordinates[0]*this.scl, coordinates[1]*this.scl, this.location.x, this.location.y);
      
      
    if (d < this.treshold_distance){
        try{
      this.target = createVector(coordinates[0]*this.scl,coordinates[1]*this.scl);
          this.jump = true;
                  
      } catch (error) {
        console.error(error);

      }
        
      } else if((d > this.treshold_distance)  &&  (this.countTry>0)){
        this.countTry--
         try{
           this.setTarget()
            }
        catch (error) {
        console.error(error);
      }
      }
  
    
    }catch (error) {
        console.error(error);

      }
    }   
 }}
  
  
  
  this.checkNeightboors = function(xT,yT){
    
    let x = floor(xT / this.scl);
    let y = floor(yT / this.scl);

    let possibleMoves = [];
    let choice = [];
    
    var excursion = floor(random(-10,10))
    
    let indexU = x+(y-excursion)*this.cols;
    let indexR = (x+excursion)+y*this.cols;
    let indexD = x+(y+excursion)*this.cols;
    let indexL = (x-excursion)+y*this.cols;


    let colU = colorPixel[indexU];
    let colR = colorPixel[indexR];
    let colD = colorPixel[indexD];
    let colL = colorPixel[indexL];
    

    if(colU >= this.treshold_gradient[0]){
      possibleMoves.push([x, y-excursion]);
    }
    if( colR >= this.treshold_gradient[0]){
      possibleMoves.push([x+excursion, y]);
    }
    if(colD >= this.treshold_gradient[0]){
      possibleMoves.push([x, y+excursion]);
    }
    if( colL >= this.treshold_gradient[0]){
      possibleMoves.push([x-excursion, y]);
    }
    if(possibleMoves.length > 0){

      choice.push(... possibleMoves);
    }
  
    
    for(let i = 0; i< choice.length;i++){
      let element = [choice[i][0]*this.scl,choice[i][1]*this.scl]
      if(this.ifalreadyused(element)){
        choice.splice(i,1);
      }
    }
    return choice;
  }
  
  this.ifalreadyused = function (element){
  let check = false
  for(let i=0; i< this.storeMoved.length;i++){
  if((floor(element[0]) == this.storeMoved[i][0]) && (floor(element[1]) == this.storeMoved[i][1])){
               check = true;

          }}
    
    return check
  
  }
  
  this.createball = function(){
    
    let dec = 0.01
    
    let casuality = random(0,100000)
    
    if (this.ball_active==false){
      
      if (casuality>100000 - ball_prob){
        this.ball_active = true
        this.circle_size_tmp = this.ball_area_size
        
      }else {
        this.circle_size_tmp = this.circle_size
      }
      
    }
    
    
      
      

  }
  
  this.update = function(){

    if(this.target == undefined){
      this.setTarget();
    }
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.treshold_activate();
    
    if(this.ball_factor==true){
      this.createball();
    }
    
    
  }
  
  this.treshold_activate =  function(){
    if (this.target !== undefined){
    let indicator = undefined
    let index = floor(this.target.x) + floor(this.target.y) * this.cols;
  
    for(let i = 0; i<  this.treshold_gradient.length; i++){
      if(colorPixel[index] < this.treshold_gradient[i]){
        indicator = i
        break;
      }
    }
    this.treshold_gradient_active  = indicator
    } else {
      this.treshold_gradient_active  = 0
    }
    

  }
  
  this.smoothbrightness = ()=>{
     
    let stop_for_smooth_color = floor(this.target.x/this.scl) + floor(this.target.y/this.scl) * this.cols;
         
    if(this.smooth != undefined){
      
       this.smooth = this.smooth + floor((colorPixel[stop_for_smooth_color]-this.smooth)*0.1)

    } else{
      
       let index_for_smooth_color = floor(this.location.x/this.scl) + floor(this.location.y/this.scl) * this.cols;
      
      this.smooth = colorPixel[index_for_smooth_color] 
    }
    
        
  }
  
  this.seek = function(){
    this.desired = p5.Vector.sub(this.target,this.location);
    this.desired.normalize();
    let noiseX = noise(this.count+701);
    let noiseY = noise(this.count + 1700);
    this.desired.add(noiseX,noiseY);
    this.count+=0.001;
    
    this.velocity.add(this.desired); 
  }
  
  this.display=function(){
  this.is_reached_up();
  let theta = this.velocity.heading() + PI;
  let index = floor(this.target.x/this.scl) + floor(this.target.y/this.scl) * this.cols;
  let index_loc = floor(this.location.x/this.scl) + floor(this.location.y/this.scl) * this.cols;

  
 this.smoothbrightness()
  
  noStroke();
  push();
  translate(this.location.x, this.location.y);
    let o = noise(this.incOpacity) * this.circle_opacity[this.treshold_gradient_active] + opacity; 
    let d = noise(this.incRadius) * this.circle_size_tmp[this.treshold_gradient_active];
  if(this.jump == false ){
    
    fill(this.colour[0],this.colour[1] + saturation_val,this.smooth + brightness_my,alpha_channel[index_loc]);   
    circle(0,0,d);
    this.incRadius=this.incRadius + 0.01;
    this.incOpacity = this.incOpacity + 0.08;
  } else {
    if((this.treshold_gradient_active >= 4) && (this.choice > 15)){
      fill(this.colour[0],this.colour[1] + saturation_val,this.smooth + brightness_my,o);   
      circle(0,0,d);
      this.incRadius=this.incRadius + 0.01;
      this.incOpacity = this.incOpacity + 0.08;

    } else if(this.treshold_gradient_active < 4){
       fill(this.colour[0],this.colour[1] +saturation_val,this.smooth + brightness_my,o);   
      circle(0,0,d);
      this.incRadius=this.incRadius + 0.01;
      this.incOpacity = this.incOpacity + 0.08;
    }
  }
 
  pop();
}
  
  
  this.is_reached_up = function(){
    //print("location---------->" + floor(this.location.x) + "     "+floor(this.location.y));
    //print("target---------->" + floor(this.target.x)+ "     "+floor(this.target.y));


  if ((((floor(this.location.x) <= floor(this.target.x)+5)) && (floor(this.location.x) >= floor(this.target.x-5))) &&   
       ((floor(this.location.y)<=floor(this.target.y+5)) && (floor(this.location.y)>=floor(this.target.y-5))))
  {
    let index = floor(this.target.x/this.scl) + floor(this.target.y/this.scl) * this.cols;
    colorPixel[index] = colorPixel[index] - 120;

    this.setTarget();
    if(this.ifalreadyused([this.target.x,this.target.y]))      {
      this.setTarget();
    } else{
      this.storeMoved.push([floor(this.target.x),floor(this.target.y)])
    }
    
  }  
  }
}