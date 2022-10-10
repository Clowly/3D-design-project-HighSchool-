let rnd = (l,u) => Math.random() * (u-l) + l;
let scene, land, space;

class tree{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
   
    this.obj.addEventListener("click",function(){
      console.log("Hi");
      for(let i=0; i<100; i++){
        tree_petal.push(new petal_tree(rnd(-6,18)+x,rnd(0,12)+y,rnd(-12,6)+z));
      }
    })

    let trunk = document.createElement("a-box");
    trunk.setAttribute("position",{x:0,y:0,z:-.75});
    trunk.setAttribute("height",12);
    trunk.setAttribute("width",2);
    trunk.setAttribute("depth",2);
    trunk.setAttribute("material",{"color":"#663D14"});
    this.obj.append(trunk);

    let rootsize = rnd(3,5);
    let trunk2 = document.createElement("a-cone");
    trunk2.setAttribute("position",{x:0,y:0,z:-.75});
    trunk2.setAttribute("radius-bottom",rootsize);
    trunk2.setAttribute("radius-top",1);
    trunk2.setAttribute("height",rootsize+0.5);
    trunk2.setAttribute("material",{"color":"#663D14"});
    this.obj.append(trunk2);

    let place_x = 2.5;
    let rotate_z = 110;
    for(let i=0; i<2; i++){
      if(rnd(0,100) < 50){
        let branch = document.createElement("a-cylinder");
        branch.setAttribute("position",{x:place_x,y:6,z:-.75});
        branch.setAttribute("radius",.75);
        branch.setAttribute("rotation",{x:0,y:0,z:rotate_z});
        branch.setAttribute("height",7);
        branch.setAttribute("material",{"color":"#53350A"});
        this.obj.append(branch);
      }
      rotate_z *= -1;
      place_x *= -1;
    }
    
    let place_z = -2;
    let rotate_x = 150;
    for(let i=0; i<2; i++){
      if(rnd(0,100) < 50){
        let branch = document.createElement("a-cylinder");
        branch.setAttribute("position",{x:0,y:6,z:place_z});
        branch.setAttribute("radius",.75);
        branch.setAttribute("rotation",{x:rotate_x,y:0,z:0});
        branch.setAttribute("height",6);
        branch.setAttribute("material",{"color":"#53350A"});
        this.obj.append(branch);
      }
      rotate_x *= -1;
      place_z += 3;
    }

    let leaf_x = -6;
    for(let i=1; i<4; i++){
      let leaf = document.createElement("a-dodecahedron");
      leaf.setAttribute("position",{x:leaf_x,y:9,z:-1});
      leaf.setAttribute("radius",4);
      leaf.setAttribute("material",{"color":"#ffb7c5"});
      this.obj.append(leaf);
      leaf_x += 6;

      this.obj.addEventListener("click",function(){
        leaf.setAttribute("material",{"color":"red"})
      });
    }

    let leaf_z = 2;
    for(let i=1; i<3; i++){
      let leaf = document.createElement("a-dodecahedron");
      leaf.setAttribute("position",{x:0,y:9,z:leaf_z});
      leaf.setAttribute("radius",4);
      leaf.setAttribute("material",{"color":"#ffb7c5"});
      this.obj.append(leaf);
      leaf_z += -8;

      this.obj.addEventListener("click",function(){
        leaf.setAttribute("material",{"color":"red"});
      });
    }

    for(let i=1; i<14; i++){
      let leaf = document.createElement("a-dodecahedron");
      leaf.setAttribute("position",{x:rnd(-6,6),y:rnd(9,12),z:rnd(2,-8)});
      leaf.setAttribute("radius",4);     
      this.obj.append(leaf);

      this.obj.addEventListener("click",function(){
        leaf.setAttribute("material",{"color":"#df440d"})
      });
    }
  }
}

class cloud{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

    for(let i=0; i<100; i++){
      let white_cloud = document.createElement("a-dodecahedron");
      white_cloud.setAttribute("position",{x:rnd(-100,200),y:rnd(290,310),z:rnd(-100,125)});
      white_cloud.setAttribute("radius",20);
      white_cloud.setAttribute("material",{"color":"#d0cccc"});
      this.obj.append(white_cloud);
    }
  }
}


class rain{
  constructor(x,y,z,dy){
    this.x=x;
    this.y=y;
    this.z=z;
    this.dy=1;
    this.obj = document.createElement("a-entity");
    let rain_drop = document.createElement("a-cylinder");
    rain_drop.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    rain_drop.setAttribute("radius",rnd(0,.075));
    rain_drop.setAttribute("height",rnd(0,2));
    this.obj.append(rain_drop); 
       
    scene.append(this.obj);
  }
  fall(){
    if(this.y>-20){
      this.y-=this.dy;
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    }else{
      this.y=100
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    }
  }
}

class snow{
  constructor(x,y,z,dy){
    this.x=x;
    this.y=y;
    this.z=z;
    this.dy=1;
    this.obj = document.createElement("a-entity");
    let rain_drop = document.createElement("a-sphere");
    rain_drop.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    rain_drop.setAttribute("radius",rnd(0,.5));
    this.obj.append(rain_drop); 
       
    scene.append(this.obj);
  }
  fall(){
    if(this.y>-20){
      this.y-=this.dy;
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    }else{
      this.y=100
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    }
  }
}

class bird{
  constructor(x,y,z){
    let body_position_y = 2.5;
    let r_wing_rotation_z = 90+45;
    let l_wing_rotation_z = -90+-45;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

    let body = document.createElement("a-box");
    body.setAttribute("position",{x:0,y:body_position_y,z:-3});
    body.setAttribute("depth",.5);
    body.setAttribute("height",.5);
    body.setAttribute("width",1.5);
    body.setAttribute("animation",{"property": "position", "to":{x:0,y:1.25,z:-3},"loop":true});
    this.obj.append(body);

    let r_wing = document.createElement("a-cylinder");
    r_wing.setAttribute("position",{x:-1.25,y:2,z:-3});
    r_wing.setAttribute("rotation",{x:0,y:0,z:r_wing_rotation_z});
    r_wing.setAttribute("radius",.2);
    r_wing.setAttribute("height",2);
    r_wing.setAttribute("animation",{"property": "rotation", "to":{x:0,y:0,z:45},"loop":true});
    this.obj.append(r_wing);

    let l_wing = document.createElement("a-cylinder");
    l_wing.setAttribute("position",{x:1.25,y:2,z:-3});
    l_wing.setAttribute("rotation",{x:0,y:0,z:l_wing_rotation_z});
    l_wing.setAttribute("radius",.2);
    l_wing.setAttribute("height",2);
    l_wing.setAttribute("animation",{"property": "rotation", "to":{x:0,y:0,z:-45},"loop":true});
    this.obj.append(l_wing);
  }
}

class light_post{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

    let pole = document.createElement("a-cone");
    pole.setAttribute("position",{x:0,y:3,z:-4});
    pole.setAttribute("height",10);
    pole.setAttribute("radius-bottom",.5);
    pole.setAttribute("radius-top",.25);
    pole.setAttribute("material",{"color":"#43464B"});
    this.obj.append(pole);

    let valve = document.createElement("a-cone");
    valve.setAttribute("position",{x:0,y:8,z:-4});
    valve.setAttribute("height",.25);
    valve.setAttribute("radius-bottom",.25);
    valve.setAttribute("radius-top",.5);
    valve.setAttribute("material",{"color":"#43464B"});
    this.obj.append(valve);

    let top = document.createElement("a-cone");
    top.setAttribute("position",{x:0,y:9,z:-4});
    top.setAttribute("height",.25);
    top.setAttribute("radius-top",.25);
    top.setAttribute("radius-bottom",.5);
    top.setAttribute("material",{"color":"#43464B"});
    this.obj.append(top);

    let there_be_light = document.createElement("a-entity");
    there_be_light.setAttribute("light", {"intensity": 4, "distance": 14, "type":"point", "color":"#FFD700", "castShadow":"true"});
    there_be_light.setAttribute("position", {x:0, y:8, z:-4});
    this.obj.append(there_be_light);

    this.obj.addEventListener("click",function(){
      there_be_light.setAttribute("light", {"intensity": 4, "distance": 24, "type":"point", "color":"#FFD700", "castShadow":"true"});
    })
  }
}

class light_post_but_no_light{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

  
    let pole = document.createElement("a-cone");
    pole.setAttribute("position",{x:0,y:3,z:-4});
    pole.setAttribute("height",10);
    pole.setAttribute("radius-bottom",.5);
    pole.setAttribute("radius-top",.25);
    pole.setAttribute("material",{"color":"#43464B"});
    this.obj.append(pole);

    let valve = document.createElement("a-cone");
    valve.setAttribute("position",{x:0,y:8,z:-4});
    valve.setAttribute("height",.25);
    valve.setAttribute("radius-bottom",.25);
    valve.setAttribute("radius-top",.5);
    valve.setAttribute("material",{"color":"#43464B"});
    this.obj.append(valve);

    let glass = document.createElement("a-box");
    glass.setAttribute("position",{x:0,y:8.25,z:-4});
    glass.setAttribute("height",.75);
    glass.setAttribute("width",.5);
    glass.setAttribute("depth",.5);
    this.obj.append(glass);

    let top = document.createElement("a-cone");
    top.setAttribute("position",{x:0,y:9,z:-4});
    top.setAttribute("height",.25);
    top.setAttribute("radius-top",.25);
    top.setAttribute("radius-bottom",.5);
    top.setAttribute("material",{"color":"#43464B"});
    this.obj.append(top);
  }
}

let r1 = 0;
class petal{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

    let petal = document.createElement("a-box");
    petal.setAttribute("height",.25);
    petal.setAttribute("width",.25);
    petal.setAttribute("depth",.01);
    petal.setAttribute("material",{"src":"spetal.PNG",});
    this.obj.append(petal);

    scene.append(this.obj);
  }
  fall(){
    if(this.y>-2){
      this.y -= 1;
      this.x -= 1;
      let r1a = 5;
      r1 += r1a;
      if(r1 == 45 || r1a == -45){
        r1a *= -1;
      }
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
      this.obj.setAttribute("rotation",{x:r1,y:0,z:0});
    }else{
      this.y = 50;
      this.x = rnd(-150,150);
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    }
  }
}

let r2 = 0;
class petal_tree{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    this.x2=x;
    this.y2=y;
    this.z2=z;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});

    let petal = document.createElement("a-box");
    petal.setAttribute("height",.25);
    petal.setAttribute("width",.25);
    petal.setAttribute("depth",.01);
    petal.setAttribute("material",{"src":"spetal.PNG",});
    this.obj.append(petal);

    scene.append(this.obj);
  }
  fall(){
    if(this.y>-2){
      this.y -= 1;
      this.x -= 1;
      let r1a = 5;
      r2 += r1a;
      if(r2 == 45 || r1a == -45){
        r1a *= -1;
      }
      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
      this.obj.setAttribute("rotation",{x:r2,y:0,z:0});
    }else{
      this.obj.setAttribute("position",{x:this.x2,y:this.y2,z:this.z2});
    }
  }
}

let bang = new Audio("fireworknoise.mp3");
class firework{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    this.size = 45;
    this.radius1 = 1;


    let box = document.createElement("a-box");
    box.setAttribute("position",{x:0,y:.5,z:0});
    box.setAttribute("material",{"src":"firework.jpg"});
    this.obj.append(box);

    let shot = document.createElement("a-sphere");
    shot.setAttribute("radius",.20);
    shot.setAttribute("material",{"src":"gunpowder.PNG"});
    this.obj.append(shot);

    let shot2 = document.createElement("a-sphere");
    shot2.setAttribute("radius",.1);
    shot2.setAttribute("position",{x:0,y:-.5,z:0});
    shot2.setAttribute("material",{"src":"gunpowder.PNG"});
    this.obj.append(shot2);

    let shot3 = document.createElement("a-sphere");
    shot3.setAttribute("radius",.1);
    shot3.setAttribute("position",{x:0,y:-.5,z:-.5});
    shot3.setAttribute("material",{"src":"gunpowder.PNG"});
    this.obj.append(shot3);

    let shot4 = document.createElement("a-sphere");
    shot4.setAttribute("radius",.05);
    shot4.setAttribute("position",{x:0,y:-.9,z:-.5});
    shot4.setAttribute("material",{"src":"gunpowder.PNG"});
    this.obj.append(shot4);

    let spark = document.createElement("a-torus");
    spark.setAttribute("position",{x:0,y:45,z:0});
    spark.setAttribute("radius",1);
    spark.setAttribute("visible",false);
    spark.setAttribute("material",{"src":"fireworkbang.jpg"});
    this.obj.append(spark);

    let spark2 = document.createElement("a-torus");
    spark2.setAttribute("position",{x:0,y:45,z:0});
    spark2.setAttribute("radius",5);
    spark2.setAttribute("visible",false);
    spark2.setAttribute("material",{"src":"fireworkbang2.jpg"});
    this.obj.append(spark2);

    this.obj.addEventListener("click",function(){
      bang.play();
      if(shot.getAttribute("position").y = 45){
        spark.setAttribute("visible",true);
        spark2.setAttribute("visible",true);
      }
      
      spark.setAttribute("animation",{"property":"radius","to":10,"loop":true, "dur":1000});
      spark2.setAttribute("animation",{"property":"rotation","to":{x:0,y:360,z:0},"loop":true, "dur":1000});
      shot.setAttribute("animation",{"property":"position","to":{x:0,y:45,z:0},"loop":true, "dur":1000});
      shot2.setAttribute("animation",{"property":"position","to":{x:0,y:45,z:0},"loop":true, "dur":1000});
      shot3.setAttribute("animation",{"property":"position","to":{x:0,y:45,z:0},"loop":true, "dur":1000});
      shot4.setAttribute("animation",{"property":"position","to":{x:0,y:45,z:0},"loop":true, "dur":1000});
    })

  }
}
let china = new Audio("china_rain.mp3");
let pagoda = new Audio("pagoda.mp3");
let nam = new Audio("vietnam.mp3");

class music{
  constructor(x,y,z){
    let m1 = document.createElement("a-box");
    m1.setAttribute("position",{x:-5,y:0,z:-2});
    scene.append(m1);

    let m2 = document.createElement("a-box");
    m2.setAttribute("position",{x:0,y:0,z:-2});
    scene.append(m2);
    
    let m3 = document.createElement("a-box");
    m3.setAttribute("position",{x:5,y:0,z:-2});
    scene.append(m3);

    m1.addEventListener("click",function(){
      china.play();
    })
    m2.addEventListener("click",function(){
      pagoda.play();
    })
    m3.addEventListener("click",function(){
      nam.play();
    })
  }
}


let foxes = [];
class animal{
  constructor(x,y,z){
    this.x = x;
    this.y = y; 
    this.z = z;
    this.obj = document.createElement("a-entity");
    this.fox = document.createElement("a-gltf-model");
    this.fox.setAttribute("src","#fox");
    this.fox.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.fox.setAttribute("rotation",{x:0,y:rnd(0,360),z:0});
    this.fox.setAttribute("scale",{x:.06,y:.03,z:.03});
    this.fox.setAttribute("animation-mixer","");
    this.fox.addEventListener("click",function(){
      this.fox.object3D.setAttribute("animation-mixer",false);
    })
    this.obj.append(this.fox);
    scene.append(this.obj);
  }
}

let f22 = [];
class plane1{
  constructor(x,y,z){
    this.x = x;
    this.y = y; 
    this.z = z;
    this.obj = document.createElement("a-entity");
    this.jet = document.createElement("a-gltf-model");
    this.jet.setAttribute("src","#jet");
    this.jet.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.jet.setAttribute("scale",{x:.02,y:.02,z:.02})
    this.jet.setAttribute("animation",{"property": "position", "to":{x:0,y:150,z:-600},"loop":true, "dur":4000});
    this.obj.append(this.jet);
    scene.append(this.obj);
  }
}

class boat{
  constructor(x,y,z){
    this.x = x;
    this.y = y; 
    this.z = z;
    this.obj = document.createElement("a-entity");
    this.ship = document.createElement("a-gltf-model");
    this.ship.setAttribute("src","#ship");
    this.ship.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.ship.setAttribute("scale",{x:1,y:1,z:1});
    this.obj.append(this.ship);
    scene.append(this.obj);
  }
}

class humen{
  constructor(x,y,z){
    this.x = x;
    this.y = y; 
    this.z = z;
    this.recycle = x;
    this.obj = document.createElement("a-entity");
    this.girl = document.createElement("a-gltf-model");
    this.girl.setAttribute("src","#charc");
    this.girl.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.girl.setAttribute("rotation",{x:0,y:90,z:0});
    this.girl.setAttribute("scale",{x:.02,y:.02,z:.02});
    this.girl.setAttribute("animation-mixer","");
    this.obj.append(this.girl);
    scene.append(this.obj);
  }
  walk(){
    this.girl.object3D.position.x += 1;
    if(this.girl.object3D.position.x >= 150){
      this.girl.object3D.position.x = this.recycle;
    }
  }
}

class stick{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    let measure_stick = document.createElement("a-cylinder");
    measure_stick.setAttribute("height",100);
    this.obj.append(measure_stick);
  }
}

let rain_day = [];
let snow_day = [];
let petal_day = [];
let tree_petal = [];
let fire2 = [];
let girl;
let weather = Math.floor(rnd(1,9));

function init(){
  scene = document.getElementById("scene");
  land = document.getElementById("ground");
  space = document.getElementById("air");

  let a1 = new firework(-20,0,-20);
  scene.append(a1.obj);

  let a2 = new firework(50,0,-20);
  scene.append(a2.obj);

  for(let i=0; i<30; i++){
    let a3 = new firework(rnd(-100,100),0,rnd(-50,300));
    scene.append(a3.obj);
  }

  let edm = new music(0,0,0);
  scene.append(edm.obj);

  //3d models
  girl = new humen(-145,-.1,0);
  let bismarck = new boat(150,-5,-200);
  for(let i=0; i<10; i++){
    foxes.push(new animal(rnd(-100,100),0.4,rnd(-25,200)));
  }
  jetx = 0;
  jetz = 400;
  for(let i=0; i<3; i++){
    let jet = new plane1(jetx,150,jetz);
    jetx -= -30;
    jetz += 40;
  }
  jet1x = 0;
  jet1z = 400;
  for(let i=0; i<3; i++){
    let jet = new plane1(jet1x,150,jet1z);
    jet1x -= 30;
    jet1z += 40;
  }



  //beach trees
  let beach_tree = 12;
  for(let i=0; i<20; i++){
    let sakura_tree = new tree(beach_tree,0,-6.6);
    scene.append(sakura_tree.obj);
    beach_tree += 23;
  }
  let beach_tree2 = -12;
  for(let i=0; i<20; i++){
    let sakura_tree = new tree(beach_tree2,0,-6.6);
    scene.append(sakura_tree.obj);
    beach_tree2 -= 23;
  }
  for(let i=0; i<30; i++){
    let tree1 = new tree(rnd(-173,-200),0,rnd(5,200));
    scene.append(tree1.obj);
  }
  for(let i=0; i<50; i++){
    let tree2 = new tree(rnd(115,180),0,rnd(5,150));
    scene.append(tree2.obj);
  }
  for(let i=0; i<25; i++){
    let tree3 = new tree(rnd(-82,-170),0,rnd(95,150));
    scene.append(tree3.obj);
  }
  let tree4 = new tree(-60,0,92);
  scene.append(tree4.obj);
  for(let i=0; i<15; i++){
    let tree5 = new tree(rnd(60,100),0,rnd(92,125));
    scene.append(tree5.obj);
  }


  //birds
  birdx = -40;
  birdz = -100;
  for(let i=0; i<5; i++){
    let bird1 = new bird(birdx,50,birdz);
    scene.append(bird1.obj);
    birdx -= -3;
    birdz += 5;
  }
  birdx1 = -40;
  birdz1 = -100;
  for(let i=0; i<5; i++){
    let bird1 = new bird(birdx1,50,birdz1);
    scene.append(bird1.obj);
    birdx1 += -3;
    birdz1 += 5;
  }
  //birds2
  birdx = 40;
  birdz = -50;
  for(let i=0; i<7; i++){
    let bird1 = new bird(birdx,70,birdz);
    scene.append(bird1.obj);
    birdx -= -3;
    birdz += 5;
  }
  birdx1 = 40;
  birdz1 = -50;
  for(let i=0; i<7; i++){
    let bird1 = new bird(birdx1,70,birdz1);
    scene.append(bird1.obj);
    birdx1 += -3;
    birdz1 += 5;
  }
  //bird3
  birdx = 100;
  birdz = -200;
  for(let i=0; i<5; i++){
    let bird1 = new bird(birdx,50,birdz);
    scene.append(bird1.obj);
    birdx -= -3;
    birdz += 5;
  }
  birdx1 = 100;
  birdz1 = -200;
  for(let i=0; i<5; i++){
    let bird1 = new bird(birdx1,50,birdz1);
    scene.append(bird1.obj);
    birdx1 += -3;
    birdz1 += 5;
  }

  let beach_post1 = 0;
    for(let i=0; i<15; i++){
      let beach_light = new light_post_but_no_light(beach_post1,0,-1);
      scene.append(beach_light.obj);
      beach_post1 += 23;
    }
    let beach_post2 = 0;
    for(let i=0; i<15; i++){
      let beach_light = new light_post_but_no_light(beach_post2,0,-1);
      scene.append(beach_light.obj);
      beach_post2 -= 23;
    }
    //Street light post
    let postnum1 = 10;
    for(let i=0; i<7; i++){
      let post = new light_post_but_no_light(-68,0,postnum1);
      scene.append(post.obj);
      postnum1 += 10.5;
    }
    let postnum2 = 10;
    for(let i=0; i<4; i++){
      let post = new light_post_but_no_light(-82,0,postnum2);
      scene.append(post.obj);
      postnum2 += 20;
    }
    let postnum3 = 10;
    for(let i=0; i<7; i++){
      let post = new light_post_but_no_light(45,0,postnum3);
      scene.append(post.obj);
      postnum3 += 10.5;
    }
    let postnum4 = 10;
    for(let i=0; i<4; i++){
      let post = new light_post_but_no_light(57,0,postnum4);
      scene.append(post.obj);
      postnum4 += 20;
    }
    let postx1 = 42;
    for(let i=0; i<9; i++){
      let post = new light_post_but_no_light(postx1,0,84);
      scene.append(post.obj);
      postx1 -= 14;
    }
    let school_post = 84;
    for(let i=0; i<6; i++){
      let post = new light_post_but_no_light(0,0,school_post);
      scene.append(post.obj);
      school_post += 12;
    }
    let school_post2 = 84;
    for(let i=0; i<6; i++){
      let post = new light_post_but_no_light(-14,0,school_post2);
      scene.append(post.obj);
      school_post2 += 12;
    }


  if(weather == 1 || weather == 2){
    space.setAttribute("material",{"src":"cloudyday.jpg"});
    for(let i=0; i<1500; i++){
      rain_day.push(new rain(rnd(-100,100),rnd(0,50),rnd(-30,200),-1));
    }
  }else if(weather == 3 || weather == 4){
    land.setAttribute("material",{"src":"snow_ground.jpg"});
    space.setAttribute("material",{"src":"snowday3.jpg"});
    for(let i=0; i<1500; i++){
      snow_day.push(new snow(rnd(-100,100),rnd(0,50),rnd(-30,200),-1));
    } 
  }else if(weather == 5 || weather == 6){

  }else if(weather == 7 || weather == 8 || weather == 9){
    for(let i=0; i<1000; i++){
      petal_day.push(new petal(rnd(-100,100),rnd(0,25),rnd(-30,200)));
    }
  }
  loop();
}


function loop(){
  for(let rain of rain_day){
    rain.fall();
  }
  for(let snow of snow_day){
    snow.fall();
  }
  for(let petal of petal_day){
    petal.fall();
  }
  for(let petal of tree_petal){
    petal.fall();
  }
  girl.walk();
 
  setTimeout(loop,10);
}