//const { PostTestScreen } = require("magpie-base");
//box2d variables             
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2WorldManifold = Box2D.Collision.b2WorldManifold;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;

// Global variables
var world;
var bodies = [];  // instances of b2Body (from Box2D)
var actors = [];  // instances of Bitmap (from IvanK)
//100
var scale = 100; //pixel to meter ratio; 1 meter = 100 pixels
var visualize = true;
//var speed;
var ratio; //pixelratio (important for retina displays)
var stage; //the stage   
var fullX = 8
var fullY = 6
var ratio = window.devicePixelRatio/2;
var speed = 1.5; // default = 2
// var speed = 0;
var collision = false; //records whether the balls collided 
var objectPositions = new Array();
var duration;
var outcome; //0 = ball missed, 1 = ball went through the gate
var topBlock;
var bottomBlock;
var position;
var pA;
var pB;

// for arrows
var hack3 = [];
var pos_arrow = 1;


//START FUNCTION
function SetupWorld(){
  //setup world 
  var gravity = new b2Vec2(0,0) //neither gravity in x nor in y direction 
  world = new b2World(gravity);
  //counter for the world
  counter = 0;      

  if (visualize){
    if (stage === undefined) {
      stage = new Stage("c");
    }else{
      //modify for arrows
    for (var i=actors.length-1; i>=0; i--){
          var actor=actors[i];
          stage.removeChild(actor);
        }
        bodies = [];  // clear the body and actor vectors
        actors = []; 
    }
    endVis();
  }

  //symmetric overdetermination 
  objectPositions[0] = [
  fullX-0.3, //default=fullX+0.3
  1.70, 
  -1, 
  .125, 
  fullX-0.3, //Ball B =fullX+0.3
  4.3, 
  -1, 
  -.125, // Ball E 
  0.60, 
  fullY/2, 
  0, 
  0, 
  0.5, // top Block 
  0.25,
  2,
  2.4,
  70, 
  0.5, // bottom block 
  0.25,
  2,
  3.6,
  290
  ]

  //symmetric joint causation 
  objectPositions[1] = [
  fullX - 0.3, //Ball A fullX+0.3
  1.7,
  -1, 
  .22, 
  fullX - 0.3, //Ball B fullX+0.3
  4.3,
  -1, 
  -.22, 
  fullX/2-0.3, //Ball E 
  fullY/2, 
  0, 
  0,
  0.5, // top Block 
  0.25,
  4.5,
  2.4,
  70, 
  0.5, // bottom block 
  0.25,
  4.5,
  3.6,
  290]

  // common causation - with single block 
  objectPositions[2] = [
  fullX-1, //Ball A 
  3,
  -1, 
  0., 
  fullX-6, //Ball B 
  fullY/2-0.3,
  0, 
  0, 
  fullX-6, //Ball E 
  fullY/2+0.3, 
  0, 
  0,
  0.5, // top Block 
  0.25,
  3.0,
  3,
  90, 
  0.5, // bottom block 
  0.25,
  -8,
  -8,
  0]
  

  // causal chain
  objectPositions[3] = [
  fullX-1, //Ball A 
  3,
  -1, 
  0, 
  fullX-4, //Ball B 
  3,
  0, 
  0, 
  fullX-6, //Ball E 
  3, 
  0, 
  0,
  0.5, // first Block 
  0.25,
  5,
  3,
  90, 
  0.5, // second block 
  0.25,
  3,
  3,
  90]

  // single causation
  objectPositions[4] = [
    fullX-1, //Ball A 
    2,
    -1, 
    0, 
    fullX-1, //Ball B 
    4,
    -1, 
    0, 
    fullX-7, //Ball E 
    2, 
    0, 
    0,
    0.5, // top Block 
    0.25,
    3,
    2,
    90, 
    0.5, // bottom block 
    0.25,
    3,
    4,
    90]

// common causation - with two blocks 
objectPositions[5] = [
  fullX-1, //Ball A 
  3,
  -1, 
  0., 
  fullX-6, //Ball B 
  fullY/2-0.3,
  0, 
  0, 
  fullX-6, //Ball E 
  fullY/2+0.3, 
  0, 
  0,
  0.5, // top Block 
  0.25,
  3.0,
  3.0,
  90, 
  0.5, // bottom block 
  0.25,
  1,
  2,
  290]


  //FUNCTION FOR CREATING WALLS 
  function createBox(w, h, x, y, type, userData, img){
    // Create the fixture definition
    var fixDef = new b2FixtureDef;

    fixDef.density = 1; // Set the density
    fixDef.friction = 0; // Set the friction 
    fixDef.restitution = 0.2; // Set the restitution - elasticity

    // Define the shape of the fixture
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(w , h); // input should be half the width and half the height
    if(userData == 'topBlock' || userData == 'bottomBlock'){
    fixDef.isSensor = true 	
    }

    // Create the body definition
    var bodyDef = new b2BodyDef;
    bodyDef.type = type;

    // Set the position of the body
    bodyDef.position.x = x;
    bodyDef.position.y = y;

    // Create the body in the box2d world
    var b = world.CreateBody(bodyDef);
    b.CreateFixture(fixDef);

    //assign user data (name)
    b.SetUserData(userData);
    
    //add to list of bodies
    bodies.push(b);

    if (visualize){
      //add image
      var bd = new BitmapData(img);
      var bm = new Bitmap(bd);  
      bm.x = -width*scale; 
      bm.y = -height*scale;
      var actor = new Sprite(); 
      actor.addChild(bm);        
      actor.scaleX = ratio; 
      actor.scaleY = ratio;
      stage.addChild(actor);
      actors.push(actor);
    }

    return b;
  }

  // FUNCTION FOR CREATING BALLS
    function createBall(r, x, y, linx, liny, type, userData, img){
    // Create the fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = 1; // Set the density
    fixDef.friction = 0; // Set the friction
    fixDef.restitution = 1; // Set the restitution - bounciness

    // Define the shape of the fixture
    fixDef.shape = new b2CircleShape;
    fixDef.shape.SetRadius(r);

    // Create the body definition
    var bodyDef = new b2BodyDef;
    bodyDef.type = type;

    // Set the position of the body
    bodyDef.position.x = x;
    bodyDef.position.y = y;

    var linearVelocity  = new b2Vec2(linx,liny)

    // Set the linear velocities 
    bodyDef.linearVelocity = linearVelocity;
    bodyDef.linearDamping = 0;
    bodyDef.angularVelocity = 0;

    // Create the body in the box2d world
    var b = world.CreateBody(bodyDef);
    b.CreateFixture(fixDef);

    //assign user data (name)
    b.SetUserData(userData);

    //add to list of bodies 
    bodies.push(b);

   if (visualize){
      //add image
      var bd = new BitmapData(img);
      var bm = new Bitmap(bd);  
      bm.x = -50; 
      bm.y = -50;
      var actor = new Sprite(); 
      actor.addChild(bm);        
      actor.scaleX = ratio*r*2; 
      actor.scaleY = ratio*r*2;
      stage.addChild(actor);
      actors.push(actor);
    }

    return b;
  }

// FUNCTION FOR CREATING the arrows
function createArrow(w, h, x, y, linx, liny, type, userData, img){
  // Create the fixture definition
  var fixDef = new b2FixtureDef;
  fixDef.density = 1; // Set the density
  fixDef.friction = 0; // Set the friction
  fixDef.restitution = 1; // Set the restitution

  // Define the shape of the fixture
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(w, h); // input should be half the width and half the height
  
  fixDef.isSensor = true 	

  // Create the body definition
  var bodyDef = new b2BodyDef;
  bodyDef.type = type;

  // Set the position of the body
  bodyDef.position.x = x;
  bodyDef.position.y = y;
      fixDef.isSensor = true 	

  var linearVelocity  = new b2Vec2(linx,liny)

  // Set the linear velocities 
  bodyDef.linearVelocity = linearVelocity;
  bodyDef.linearDamping = 0;
  bodyDef.angularVelocity = 0;

  // Create the body in the box2d world
  var b = world.CreateBody(bodyDef);
  b.CreateFixture(fixDef);

  //assign user data (name)
  b.SetUserData(userData);

  //add to list of bodies 
  bodies.push(b);

 if (visualize){
    //add image
    var bd = new BitmapData(img);
    var bm = new Bitmap(bd);  
    bm.x = -width*scale/10; 
    bm.y = -height*scale/10;
    var actor = new Sprite(); 
    actor.addChild(bm);        
    actor.scaleX = ratio; 
    actor.scaleY = ratio;
    stage.addChild(actor);
    actors.push(actor);
  }

  return b;
}

    
     //SET UP THE WALLS 
     //top wall 
    createBox(
    width = fullX/2, //width
    height = 0.1, //height 
    x = fullX/2,//x
    y = 0.1, //y
    b2Body.b2_staticBody, //what type of body
    "topWall", //userdata 
    "static/images/longWall.png") //image

    //bottom wall 
    createBox(
    width = fullX/2, //width
    height = 0.1, //height 
    x = fullX/2,//x
    y = fullY-0.1, //y
    b2Body.b2_staticBody, //what type of body
    "bottomWall", //userdata 
    "static/images/longWall.png") //image
    
    //top-left wall 
    createBox(
    width = 0.1, //width
    height = 1, //height=1 
    x = 0.1,//x
    y = 0, //y=1
    b2Body.b2_staticBody, //what type of body
    "topLeftWall", //userdata 
    "static/images/shortWall.png") //image

    //bottom-left wall 
    createBox(
    width = 0.1, //width
    height = 1, //height=1 
    x = 0.1,//x
    y = 6, //y=5
    b2Body.b2_staticBody, //what type of body
    "topLeftWall", //userdata 
    "static/images/shortWall.png") //image

    // var clip = parent.document.getElementById("clip").value-1
    // clip = 0

    //hack to change position of block
    var hack = [];
    var hack2 = [];

    // 
    if (position.includes("Abottom") || position.includes("Aleft")){
    //if (position == "Abottom" || position == "Aleft"){
    //if (position == "Abottom"){
      //console.log('block switch');
      hack = [19,20,14,15];
      hack2 = [21,16];
    }else{
    hack = [14,15,19,20];
    hack2 = [16,21];
    }
    
    
    //block mirror for common causation - two blocks, Etop
    if(clip == 5 && position.includes("Etop")) {
      objectPositions[clip][20] = 4;
      objectPositions[clip][21] = 70;
    }
    //top block 
    createBox(
    width = objectPositions[clip][12], //width
    height = objectPositions[clip][13], //height 	
    x = objectPositions[clip][hack[0]],//x
    y = objectPositions[clip][hack[1]], //y
    b2Body.b2_staticBody, //what type of body
    "topBlock", //userdata 
    "static/images/block_red" + (Math.round((1-pA)*100)) + ".png") //image

    //bottom block  
    createBox(
    width = objectPositions[clip][17], //width
    height = objectPositions[clip][18], //height 
    x = objectPositions[clip][hack[2]],//x
    y = objectPositions[clip][hack[3]], //y
    b2Body.b2_staticBody, //what type of body
    "bottomBlock", //userdata 
    "static/images/block_red" + (Math.round((1-pB)*100)) + ".png") //image

    bodies[4].SetAngle(objectPositions[clip][hack2[0]]*Math.PI/180);
    bodies[5].SetAngle(objectPositions[clip][hack2[1]]*Math.PI/180);

  //COUNTERBALANCE THE POSITIONS OF THE BALLS
  if (position == 'Abottom'){
    objectPositions[clip][1] = 6-objectPositions[clip][1];
    objectPositions[clip][3] = objectPositions[clip][3]*(-1);
    objectPositions[clip][5] = 6-objectPositions[clip][1];
    objectPositions[clip][7] = objectPositions[clip][3]*(-1);
    pos_arrow = -1;
    // bodies[4].SetUserData("bottomBlock");
    // bodies[5].SetUserData("topBlock");
  } // causal chain and single causation - control
  else if (position == 'Aleft') {
    objectPositions[clip][0] = objectPositions[clip][0]-3;
    objectPositions[clip][2] = 0;
    objectPositions[clip][4] = objectPositions[clip][4]+3;
    objectPositions[clip][6] = -1;
  } // 
  // single causation
  else if (clip == 4) {
    new_pos = position.split("_");
    //console.log('pos_arr', new_pos);
    // Etop is default for this condition
    if(new_pos[1] == 'Ebottom') {
      objectPositions[clip][9] = 4;
      //objectPositions[clip][2] = 0;
      //objectPositions[clip][6] = -1;
    }
    if(new_pos[0] == 'Abottom') {
      objectPositions[clip][1] = 4;
      // swap velocity of A and B
      //var temp = objectPositions[clip][2];
      //objectPositions[clip][2] = objectPositions[clip][6];
      objectPositions[clip][5] = 2;
      //objectPositions[clip][6] = temp;
    }
  }
  // common causation
  else if(clip == 2 || clip == 5) {
    new_pos = position.split("_");
    //console.log('pos_arr', new_pos);
    if(new_pos[1] == 'Etop') {
      objectPositions[clip][5] = objectPositions[clip][5]+0.6;
      objectPositions[clip][9] = objectPositions[clip][9]-0.6;
    }
    if(new_pos[0] == 'Aleft') {
      objectPositions[clip][0] = fullX-6;
      objectPositions[clip][1] = objectPositions[clip][5];
      objectPositions[clip][2] = 0;

      objectPositions[clip][4] = fullX-1;
      objectPositions[clip][5] = 3;
      objectPositions[clip][6] = -1;
    }
  } 
  
  // for the arrows
  var v_pos = [2,3,6,7]; 
  hack3 = [];
  for(var i=0; i<v_pos.length; i+=2) {
    var vx = Math.abs(objectPositions[clip][v_pos[i]]);
    var vy = Math.abs(objectPositions[clip][v_pos[i+1]]);
    //var vx = objectPositions[clip][v_pos[i]];
    //var vy = objectPositions[clip][v_pos[i+1]];
    if (vx == 0 && vy == 0) {
      // out of the screen
      hack3[i] = -10;
      hack3[i+1] = -10;      
    }
    else {
      //hack3[i] = objectPositions[clip][v_pos[i]-2] + (0.4/(vx+vy))*vy;
      hack3[i] = objectPositions[clip][v_pos[i]-2]+objectPositions[clip][v_pos[i]]/4-(0.4/(vx+vy))*(vx-vy);
      //hack3[i] = 0.3
      hack3[i+1] = objectPositions[clip][v_pos[i]-1]+objectPositions[clip][v_pos[i+1]]+0.5;
    }
  }
  //console.log(hack3);
  
   // ADD THE BALLS 
   createBall(
    0.33, //radius
    objectPositions[clip][0], //x position
    objectPositions[clip][1], //y position
    objectPositions[clip][2]*speed, //linear velocity in x direction
    objectPositions[clip][3]*speed, //linear velocity in y direction
    b2Body.b2_dynamicBody, //body type
    "ballA", //user data 
    "static/images/ballA.png" //image
    )

  createBall(
    0.33, //radius
    objectPositions[clip][4], //x position
    objectPositions[clip][5], //y position
    objectPositions[clip][6]*speed, //linear velocity in x direction
    objectPositions[clip][7]*speed, //linear velocity in y direction
    b2Body.b2_dynamicBody, //body type
    "ballB", //user data 
    "static/images/ballB.png" //image
    )

  createBall(
    0.33, //radius
    objectPositions[clip][8], //x position
    objectPositions[clip][9], //y position
    objectPositions[clip][10]*speed, //linear velocity in x direction
    objectPositions[clip][11]*speed, //linear velocity in y direction
    b2Body.b2_dynamicBody, //body type
    "ballE", //user data 
    "static/images/ballE.png" //image
    )

  // add arrows for initially moving balls
  createArrow(
    width = 0.01, //width
    height = 0.02, //height 
    x = hack3[0],//x
    y = hack3[1], //y
    0*speed, //linear velocity in x direction
    0*speed, //linear velocity in y direction
    b2Body.b2_dynamicBody, //what type of body
    "arrowA", //userdata 
    "static/images/arrow.png")

  createArrow(
    width = 0.01, //width
    height = 0.02, //height 
    x = hack3[2],//x
    y = hack3[3], //y
    0*speed, //linear velocity in x direction 6
    0*speed, //linear velocity in y direction
    b2Body.b2_dynamicBody, //what type of body
    "arrowB", //userdata 
    "static/images/arrow.png")

    // disjunctive or conjunctive
    if (clip == 0 || clip == 1) {
      bodies[9].SetAngle(-pos_arrow*10*Math.PI/180);
      bodies[10].SetAngle(pos_arrow*10*Math.PI/180);
    }
    


  
  //ADD CONTACT LISTENER
  var listener = new b2ContactListener();
  listener.BeginContact = function(contact) {
    a = contact.GetFixtureA().GetBody().GetUserData()
    b = contact.GetFixtureB().GetBody().GetUserData()
    //red block  
    
    if (topBlock){
      if((a == "ballA" & b == "topBlock") | (b == "ballA" & a == "topBlock")){
        bodies[6].SetAwake(false); //6
      }
    }
    //bottom block 
    if (bottomBlock){
      if((a == "ballB" & b == "bottomBlock") | (b == "ballB" & a == "bottomBlock")){
        bodies[7].SetAwake(false);//7
      }
    }
  }
  
  world.SetContactListener(listener);
  
  //RUN UPDATE FUNCTION 
  beginVis();
} // end Start()

//WORLD UPDATE FUNCTION
function animateWorld()
{
  world.Step(1/60,  5,  5);
  world.ClearForces();

  for(var i=0; i<actors.length; i++)
  {
    var body  = bodies[i];
    var actor = actors[i];
    var p = body.GetPosition();
    var usr = body.GetUserData();
    //if (usr == "arrowA" || usr == "arrowB") {
      //var p_ball = bodies[i-3].GetPosition();
      //actor.x = (p_ball.x - ((usr=="arrowA")?hack3[0]:hack3[2]))*ratio*scale;
      //actor.y = (p_ball.y + ((usr=="arrowA")?hack3[1]:hack3[3]))*ratio*scale;
    //  actor.x = ((usr=="arrowA")?hack3[0]:hack3[2])*ratio*scale;
    //  actor.y = ((usr=="arrowA")?hack3[1]:hack3[3])*ratio*scale;
    //}
    //else {
      actor.x = p.x * ratio* scale;
      actor.y = p.y * ratio* scale;
    //}
    actor.rotation = body.GetAngle() * 180 / Math.PI;    
  }

  counter++;
  // for arrows, disappear after some ms
  if(counter == 40) {
    world.DestroyBody(bodies[10]);
    world.DestroyBody(bodies[9]);
    // disappear if the trial is a whole video clip
    if (duration > 150) {
      stage.removeChild(actors[10]);
      stage.removeChild(actors[9]);
    }
  }


  //end of clip
  if (counter == duration){
    // modify to solve the arrow
    for (var i = bodies.length-1; i >= 0; i--) {
      var body = bodies[i];
      world.DestroyBody(body);
      //$('#simulate', parent.document).prop('disabled',false);
      // var actor=actors[i];
      // stage.removeChild(actor);
    }
  }
}

//begin animation during visualization
function Start(structure,block1,block2,time,pos,pa, pb) {
  if(structure == 'disjunctive'){
    clip = 0 
  }
  else if(structure == 'conjunctive'){
    clip = 1
  }
  else if(structure == 'common_single'){
    clip = 2
  } //common causation
  else if(structure == 'chain') {
    clip = 3
  }
  else if(structure == 'single') {
    clip = 4
  }  // common with two blocks
  else if(structure == 'common_both') {
    clip = 5
  }

  position = pos // position of ball A (used for counterbalancing)
  duration = time;
  topBlock = block1;
  bottomBlock = block2;	
  pA = pa;
  //console.log('pA', pA);
  pB = pb;
  //console.log('pB', pB);
  visualize = true;
  SetupWorld();
}

//begin animation during visualization
function beginVis() {
    //console.log("beginVis()")
  if (visualize) {stage.addEventListener(Event.ENTER_FRAME, animateWorld)}
}

//end animation during visualization
function endVis() {
  if (visualize) {stage.removeEventListener(Event.ENTER_FRAME, animateWorld)}
}

