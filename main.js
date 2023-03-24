//Declare initals varibles
var wS = 1100;
var font;

function preload() {
  font = loadFont('font/AvenirNextLTW01-Medium.ttf');
}

function setup() {
  var canvas = createCanvas(wS, wS);
  canvas.parent('canvas');

  frameRate(60);
  //noLoop();
}

//Calculate: Sizes
let d = (wS / 5) * 3.5;
let r = d / 2;
let pointSize = wS / 100;
let lineSize = wS / 500;
let timeSize = wS / 100 * 8;
let dateSize = wS / 100 * 4;
let vl1 = wS / 10;
let vl2 = vl1 * 1.1;
let vl3 = vl1 * 1.7;
let vl4 = vl1 * 1.4;
let vl5 = vl1 * 1.5;
let vl6 = vl1 * 1.9;

//Declare: Varibles
let start = 0;

var dflt_color = 255;
var line_color = '#FCAFC9';

let timeWidth;

var dateSpr = '|';
var timeSpr = ':';

//Declare: Lists
var lineAngle = [];
var gridAngle = [];
//var lineSpeed = [0.1, 15];
/*var lineSize1 = [-vl1/3, -vl3*0.6];
var lineSize2 = [-vl3/1.75, -vl3*0.85];*/
/*var lineSize1 = [-vl1 / 3, -vl3 * 0.90];
var lineSize2 = [-vl3 / 1.75, -vl3 * 1.05];*/
var lineSize1 = [-vl1 / 3, -vl1 / 3];
var lineSize2 = [-vl3 / 1.75, -vl1 / 1.5];
//var lineSize2 = [-vl1/2, -vl1*0.625];
//var lineSize2 = [-r, -r];
var gridSize1 = [-vl1 / 3, -vl1 / 3];
var gridSize2 = [-vl1 / 2, -vl1 / 1.5];
//var PValues = [];
//var vars = ['yy', 'mm', 'dd', 'h', 'm', 's'];
var month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function draw() {
  background('#ff6b99');

  var yy = year().toString().slice(-2);
  var mm = month();
  var dd =('0' + day()).slice(-2);
  var h = ('0' + hour()).slice(-2);
  var m = ('0' + minute()).slice(-2);
  var s = ('0' + second()).slice(-2);
  
  mm = month_list[mm - 1];

  var time = (h) + timeSpr + (m) + timeSpr + (s);

  translate(wS / 2, wS / 2)
  
  if (start == 0) {
    start = 1;

    textFont(font);
    textSize(timeSize);
    timeWidth = textWidth(time);

    lineAngle = [radians(-(90 + (m * (-6)))), radians(-(90 + (h * (-30))))];
    //gridAngle = [-HALF_PI, -HALF_PI];

    //PValues = [m, h];
  }
  
  //Analog Clock
  stroke(line_color);
  smooth();

  //7.5 or 5

  //CValues = [m, h];

  gridAngle = [-HALF_PI, -HALF_PI];;

  for (let i = 0; i < 12; i++) {
    for (let i = 0; i < 5; i++) {
      x1 = (r + gridSize1[0]) * cos(gridAngle[0]);
      y1 = (r + gridSize1[0]) * sin(gridAngle[0]);
      x2 = (r + gridSize2[0]) * cos(gridAngle[0]);
      y2 = (r + gridSize2[0]) * sin(gridAngle[0]);

      strokeWeight(lineSize);
      line(x1, y1, x2, y2);

      gridAngle[0] += radians(6);
    }

    x1 = (r + gridSize1[1]) * cos(gridAngle[1]);
    y1 = (r + gridSize1[1]) * sin(gridAngle[1]);
    x2 = (r + gridSize2[1]) * cos(gridAngle[1]);
    y2 = (r + gridSize2[1]) * sin(gridAngle[1]);

    strokeWeight(lineSize * 1.5);
    line(x1, y1, x2, y2);

    gridAngle[1] += radians(30);
  }

  for (let i = 0; i < 2; i++) {
    //let i = 2; i > -1; i--
    //let i = 0; i < 3; i++
    x1 = (r + lineSize1[i]) * cos(lineAngle[i]);
    y1 = (r + lineSize1[i]) * sin(lineAngle[i]);
    x2 = (r + lineSize2[i]) * cos(lineAngle[i]);
    y2 = (r + lineSize2[i]) * sin(lineAngle[i]);

    x3 = (r + vl1 / 3) * cos(lineAngle[i]);
    y3 = (r + vl1 / 3) * sin(lineAngle[i]);

    stroke(line_color);
    strokeWeight(lineSize);
    line(0, 0, x2, y2);

    if (Number(h) * 5 == Number(m)) {blendMode(OVERLAY);}
    stroke(dflt_color);
    strokeWeight(pointSize);
    line(x1, y1, x2, y2);
    point(x3, y3);
    blendMode(NORMAL);

    if (i == 0) {
      lineAngle[0] = radians(-(90 + (m * (-6))));
    } else {
      lineAngle[1] = radians(-(90 + (h * (-30))));
    }
    
    //lineAngle[i] += radians(1*lineSpeed[i]);

    /*if (PValues[i] != CValues[i]) {
      lineAngle[i] += radians(lineSpeed[i]);
      PValues = [m, h];
    }*/
  }

  point(0, 0);

  //Digital Clock
  fill('#ff6b99');
  noStroke();
  //rect((-timeWidth-vl4)/2, -vl6, timeWidth+vl4, vl5);
  rect(( - timeWidth-vl1) / 2, - vl3, timeWidth + vl1, vl2);
  rect(( - timeWidth-vl1 / 2) / 2, vl2 - vl1 / 6, timeWidth + vl1 / 2, vl2 / 2 - vl1 / 12 + vl1 / 6);

  /*stroke(100);
  strokeWeight(0.75);
  line(-wS/2, -wS/2, 0, 0);
  line(wS/2, -wS/2, wS/4, -wS/4);
  line(0, 0, -wS/4, wS/4);
  line(0, 0, 0, -30);*/

  fill(dflt_color);
  noStroke();
  smooth();
  
  textSize(dateSize);
  
  if (dateSpr = '|') {
    dateSpr = '';
    var dateSprT = '|';

    textAlign(LEFT, CENTER);
    text(dateSprT, -timeWidth / 4, vl2 + vl1 / 15);

    textAlign(RIGHT, CENTER);
    text(dateSprT, timeWidth / 4, vl2 + vl1 / 15);
  }

  textAlign(LEFT, TOP);
  text(dd, -timeWidth / 2, vl1);
  text(dateSpr, -timeWidth / 4, vl1);

  textAlign(CENTER, TOP);
  text(mm, 0, vl1);

  textAlign(RIGHT, TOP);
  text(yy, timeWidth / 2, vl1);
  text(dateSpr, timeWidth / 4, vl1);

  textAlign(CENTER, CENTER);
  textSize(timeSize);
  text(time, 0, -vl3 + (vl1 / 2));

  noFill();
  strokeWeight(2);
  stroke(dflt_color);
  ellipse(0, 0, d);

  rect((-timeWidth - vl1) / 2, -vl3, timeWidth + vl1, vl2);
  rect((-timeWidth - vl1 / 2) / 2, vl2 - vl1 / 6, timeWidth + vl1 / 2, vl2 / 2-vl1 / 12 + vl1 / 6);
}
