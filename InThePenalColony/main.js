var traveller, officer, soldier, comannedman;
var page;

var py = 120;
var ph = 430;
var px1 = 60;
var px2 = 300;
var px3 = 550;
var px4 = 780;
var pw = 170;

var cy = 79;
var ch = 80;
var cx1 = 762;
var cx2 = 837;
var cx3 = 905;
var cw = 55;

var page0, page10, page11, page12, page13, page14, page15, page16, page17, page18, page19, page20, page21, page22, page23, page24, page25, page26, page27, page28, page30, page31, page32, page33, page34, page35, page36, page37, page38, page40, page41, page42, page43, page44, page45, page46, page47;

function preload(){
  // traveller = loadImage("img/traveller.png")
  // officer = loadImage("img/officer.png")
  // soldier = loadImage("img/soldier.png")
  // comannedman = loadImage("img/comannedman.png")
  page0 = loadImage("img/page0.png")

  page10 = loadImage("img/page10.png")
  page11 = loadImage("img/page11.png")
  page12 = loadImage("img/page12.png")
  page13 = loadImage("img/page13.png")
  page14 = loadImage("img/page14.png")
  page15 = loadImage("img/page15.png")
  page16 = loadImage("img/page16.png")
  page17 = loadImage("img/page17.png")
  page18 = loadImage("img/page18.png")
  page19 = loadImage("img/page19.png")

  page20 = loadImage("img/page20.png")
  page21 = loadImage("img/page21.png")
  page22 = loadImage("img/page22.png")
  page23 = loadImage("img/page23.png")
  page24 = loadImage("img/page24.png")
  page25 = loadImage("img/page25.png")
  page26 = loadImage("img/page26.png")
  page27 = loadImage("img/page27.png")
  page28 = loadImage("img/page28.png")
  //page29 = loadImage("img/page29.png")

  page30 = loadImage("img/page30.png")
  page31 = loadImage("img/page31.png")
  page32 = loadImage("img/page32.png")
  page33 = loadImage("img/page33.png")
  page34 = loadImage("img/page34.png")
  page35 = loadImage("img/page35.png")
  page36 = loadImage("img/page36.png")
  page37 = loadImage("img/page37.png")
  page38 = loadImage("img/page38.png")
  //page39 = loadImage("img/page39.png")

  page40 = loadImage("img/page40.png")
  page41 = loadImage("img/page41.png")
  page42 = loadImage("img/page42.png")
  page43 = loadImage("img/page43.png")
  page44 = loadImage("img/page44.png")
  page45 = loadImage("img/page45.png")
  page46 = loadImage("img/page46.png")
  page47 = loadImage("img/page47.png")
}

function setup() {
  createCanvas(1000, 600);
  background(255);
  page = 0;
}

function draw(){
  if (page == 0) {
    pageStart();
  }else if (page == 10) {
    pageTen();
  }else if (page == 11) {
    pageEleven();
  }else if (page == 12) {
    pageTwelve();
  }else if (page == 13) {
    pageThirteen();
  }else if (page == 14) {
    pageFourteen();
  }else if (page == 15) {
    pageFifteen();
  }else if (page == 16) {
    pageSixteen();
  }else if (page == 17) {
    pageSeventeen();
  }else if (page == 18) {
    pageEighteen();
  }else if (page == 19) {
    pageNineteen();
  }else if (page == 20) {
    pageTwenty();
  }else if (page == 21) {
    pageTwentyone();
  }else if (page == 22) {
    pageTwentytwo();
  }else if (page == 23) {
    pageTwentythree();
  }else if (page == 24) {
    pageTwentyfour();
  }else if (page == 25) {
    pageTwentyfive();
  }else if (page == 26) {
    pageTwentysix();
  }else if (page == 27) {
    pageTwentyseven();
  }else if (page == 28) {
    pageTwentyeight();
  }else if (page == 30) {
    pageThirty();
  }else if (page == 31) {
    pageThirtyone();
  }else if (page == 32) {
    pageThirtytwo();
  }else if (page == 33) {
    pageThirtythree();
  } else if (page == 34) {
    pageThirtyfour();
  }else if (page == 35) {
    pageThirtyfive();
  }else if (page == 36) {
    pageThirtysix();
  }else if (page == 37) {
    pageThirtyseven();
  }else if (page == 38) {
    pageThirtyeight();
  }else if (page == 40) {
    pageForty();
  }else if (page == 41) {
    pageFortyone();
  }else if (page == 42) {
    pageFortytwo();
  }else if (page == 43) {
    pageFortythree();
  }else if (page == 44) {
    pageFortyfour();
  }else if (page == 45) {
    pageFortyfive();
  }else if (page == 46) {
    pageFortysix();
  }else if (page == 47) {
    pageFortyseven();
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    if(page == 10 || page == 20 || page == 30 || page == 40){
      page = page;
    }else{
      page = page - 1;
    }
  } else if (keyCode == RIGHT_ARROW) {
    if(page == 19 || page == 28 || page == 38 || page == 47){
      page = page;
    }else{
      page = page + 1;
    }
  }
  //return false; // prevent default
}

function mousePressed(){
  if(page == 0){
    if(overCharacter(px1, py, pw, ph) == true){
      page = 20;
    }else if(overCharacter(px2, py, pw, ph) == true){
      page = 10;
    }else if(overCharacter(px3, py, pw, ph) == true){
      page = 30;
    }else if(overCharacter(px4, py, pw, ph) == true){
      page = 40;
    }
  }else {
    //back
    if(overCharacter(600, 0, 400, 50) == true){
      page = 0;
    }
    //LEFT_ARROW
    else if (overCharacter(70,500,80,50) == true) {
      if(page == 10 || page == 20 || page == 30 || page == 40){
        page = page;
      }else{
        page = page - 1;
      }
    }
    //RIGHT_ARROW
    else if (overCharacter(870, 500, 80, 50) == true){
      if(page == 19 || page == 28 || page == 38 || page == 47){
        page = page;
      }else{
        page = page + 1;
      }
    }
    //Traveller
    else if (overCharacter(cx1, cy, cw, ch) && (page == 11)) {
      page = 21;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 13)) {
      page = 42;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 14)) {
      page = 24;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 15)) {
      page = 23;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 16)) {
      page = 27;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 18)) {
      page = 28;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 18)) {
      page = 47;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 19)) {
      page = 38;
    }
    //Officer
    else if (overCharacter(cx1, cy, cw, ch) && (page == 21)) {
      page = 11;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 23)) {
      page = 13;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 23)) {
      page = 43;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 24)) {
      page = 14;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 24)) {
      page = 33;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 25)) {
      page = 35;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 26)) {
      page = 34;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 27)) {
      page = 16;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 27)) {
      page = 37;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 27)) {
      page = 46;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 28)) {
      page = 18;
    }

    //Traveller
    else if (overCharacter(cx1, cy, cw, ch) && (page == 31)) {
      page = 11;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 31)) {
      page = 21;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 32)) {
      page = 41;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 33)) {
      page = 24;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 34)) {
      page = 26;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 35)) {
      page = 25;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 35)) {
      page = 45;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 37)) {
      page = 27;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 38)) {
      page = 19;
    }

    //CondemnedMan
    else if (overCharacter(cx2, cy, cw, ch) && (page == 40)) {
      page = 23;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 41)) {
      page = 32;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 42)) {
      page = 13;
    }else if (overCharacter(cx3, cy, cw, ch) && (page == 44)) {
      page = 35;
    }else if (overCharacter(cx1, cy, cw, ch) && (page == 46)) {
      page = 18;
    }else if (overCharacter(cx2, cy, cw, ch) && (page == 46)) {
      page = 28;
    }
  }
}

function overCharacter(x, y, dw, dh){
  if (mouseX > x && mouseX < x + dw && mouseY > y && mouseY < y + dh) {
      return true;
    }
    else {
      return false;
    }
}

function pageStart(){
  background(255);
  image(page0, 0, 0);
  //textAlign(CENTER);
  // textStyle(BOLD);
  // textSize(30);
  // text("In the Penal Colony", 200, 100);
  // image(traveller, 80, 200);
  // image(officer, 220, 200);
  // image(soldier, 350, 200);
  // image(comannedman, 490, 200);
  // textSize(20);
  // textStyle(NORMAL);
  // text("Traveller", 90, 380);
  // text("Officer", 235, 380);
  // text("Soldier", 365, 380);
  // text("Commannedman", 460, 380);
  // textSize(25);
  // textStyle(ITALIC);
  // text("Please select a character above", 160, 450);
}

function pageTen(){
  background(255);
  image(page10, 0, 0);
}
function pageEleven(){
  background(255);
  image(page11, 0, 0);
}
function pageTwelve(){
  background(255);
  image(page12, 0, 0);
}
function pageThirteen(){
  background(255);
  image(page13, 0, 0);
}
function pageFourteen(){
  background(255);
  image(page14, 0, 0);
}
function pageFifteen(){
  background(255);
  image(page15, 0, 0);
}
function pageSixteen(){
  background(255);
  image(page16, 0, 0);
}
function pageSeventeen(){
  background(255);
  image(page17, 0, 0);
}
function pageEighteen(){
  background(255);
  image(page18, 0, 0);
}
function pageNineteen() {
  background(255);
  image(page19, 0, 0);
}

function pageTwenty(){
  background(255);
  image(page20, 0, 0);
}
function pageTwentyone(){
  background(255);
  image(page21, 0, 0);
}
function pageTwentytwo(){
  background(255);
  image(page22, 0, 0);
}
function pageTwentythree(){
  background(255);
  image(page23, 0, 0);
}
function pageTwentyfour(){
  background(255);
  image(page24, 0, 0);
}
function pageTwentyfive(){
  background(255);
  image(page25, 0, 0);
}
function pageTwentysix(){
  background(255);
  image(page26, 0, 0);
}
function pageTwentyseven(){
  background(255);
  image(page27, 0, 0);
}
function pageTwentyeight(){
  background(255);
  image(page28, 0, 0);
}

function pageThirty(){
  background(255);
  image(page30, 0, 0);
}
function pageThirtyone(){
  background(255);
  image(page31, 0, 0);
}
function pageThirtytwo(){
  background(255);
  image(page32, 0, 0);
}
function pageThirtythree(){
  background(255);
  image(page33, 0, 0);
}
function pageThirtyfour(){
  background(255);
  image(page34, 0, 0);
}
function pageThirtyfive(){
  background(255);
  image(page35, 0, 0);
}
function pageThirtysix(){
  background(255);
  image(page36, 0, 0);
}
function pageThirtyseven(){
  background(255);
  image(page37, 0, 0);
}
function pageThirtyeight(){
  background(255);
  image(page38, 0, 0);
}

function pageForty(){
  background(255);
  image(page40, 0, 0);
}
function pageFortyone(){
  background(255);
  image(page41, 0, 0);
}
function pageFortytwo(){
  background(255);
  image(page42, 0, 0);
}
function pageFortythree(){
  background(255);
  image(page43, 0, 0);
}
function pageFortyfour(){
  background(255);
  image(page44, 0, 0);
}
function pageFortyfive(){
  background(255);
  image(page45, 0, 0);
}
function pageFortysix(){
  background(255);
  image(page46, 0, 0);
}
function pageFortyseven(){
  background(255);
  image(page47, 0, 0);
}
