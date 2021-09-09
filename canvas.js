const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

cvs.width = 1300;
cvs.height = 600;

class Circle {

    constructor(x, y, radius, red, green, blue) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.colour = 'rgba(' + String(red) + ',' + String(green) + ',' + String(blue) + ',';
      this.strVal = '';
      this.fllVal = '';
      this.on = -1;
    }

    draw = () => {
      if (this.on == -1){
        this.strVal = '0.6)';
        this.fllVal = '0.1)';
      } else {
        this.strVal = '0.7)';
        this.fllVal = '1.0)';
      }
      c.strokeStyle = this.colour + this.strVal;
      c.fillStyle = this.colour + this.fllVal;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      c.fill();
      c.stroke();
      c.closePath();
      this.update();
    }

    switch = () => {
      this.on *= -1;
    }

    turnOff = () => {
      this.on = -1;
    }

    update = () => {
    }
};

function animate() {

  frame++;

  console.log('frame: ', frame , ' times: ', times, ' mod: ', frame % (6*timeToChange), ' ttc: ', timeToChange);

  if (!dancing){
    if (frame % (6*timeToChange) == 0){
      if (times == 0){
        circArray[times].switch();
        circArray[circArray.length-1].switch();
        times++;
      } else if (times == circArray.length){
        circArray[times-1].switch();
        circArray[0].switch();
        times = 1;
      } else {
        circArray[times].switch();
        circArray[times-1].switch();      
        times++;
      }
    }
  } else {
    if (frame % (6*timeToChange) == 0){
      for (let i = 0; i < circArray.length; i++){
        if (Math.floor(Math.random() * 10) < 6){
          circArray[i].switch();
        }
      }
    }
  }

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circArray.forEach(Circle => {
      Circle.draw();
  });

  if (toggled){
    var animation = window.requestAnimationFrame(animate);
  } else {
    window.cancelAnimationFrame(animation);
  };
};

/*const Colours = [
    'rgba(255, 0, 0,',
    'rgba(0, 0, 255,',
    'rgba(0, 255, 0,',
    'rgba(255, 0, 255,',
    'rgba(145, 0, 104,',
    'rgba(255, 120, 0,',
    'rgba(255, 255, 0,',
    'rgba(0, 255, 255,'
]*/

function buttonSwitch(){
  console.log('frame: ', frame , ' !!ANIMATION STOPPED!!');
  if (!toggled){
    toggled = true;
  } else {
    toggled = false;
  }

  if (freshGame){
    start();
    freshGame = false;
  }

  animate();
}

function increaseSpeed(){
  if (timeToChange > 1){
    timeToChange -= 1;
  }
}

function reduceSpeed(){
    timeToChange += 1;
}

function start(){
    circArray[circArray.length-1].switch();
    animate();
}

/*const circArray = [];
for (let i = 0; i < 13; i++){
    const center = { x: 30, y: 300};
    const r = 25;
    circArray.push(
        new Circle(
            center.x + i*60,
            center.y,
            r, 
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
            )
    );
};*/


/*Dance_Floor*/
const circArray = [];
var j = 0;
var h = 0;
for (let i = 0; i < 75; i++){
    const center = { x: 50, y: 100};
    const r = 30;
    if (i%15 == 0 && i != 0){
      j++;
      h = 0;
    }
    circArray.push(
        new Circle(
            center.x + h*80,
            center.y*(j+1),
            r, 
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
            )
    );
    h++;
};

function dance(){
  console.log('frame: ', frame , ' !!WOOT WOOT DANCE TIME!!');
  if (!dancing){
    dancing = true;
  } else {
    dancing = false;
  }

  buttonSwitch();
}

function reset(){
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circArray.forEach(Circle => {
    Circle.turnOff();
    Circle.draw();
  });

  frame = -10;
  times = 0;

  toggled = false;

  freshGame = true;

}

var frame = -10;
var timeToChange = 5;
var times = 0;

var toggled = false;

var freshGame = true;

var dancing = false;

circArray.forEach(Circle => {
  Circle.draw();
});

