var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

imgDog = new Image();
imgDog.src = "images/dog.svg"
imgDog.addEventListener("load", init, false);

var requestAnimFrame =
  window.requestAnimFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback, 1000/60);
  };
var dogX = 65;
var dogY = 65;

function init(){
    requestAnimFrame(update);
}
function update(){

  context.drawImage(imgDog, dogX, dogY, 100, 77);
}
