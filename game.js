//global variables
var game;
var platforms;
var player;
var cursors;
var coins;
var score = 0;
var scoreText;
var win = false;
var winScore = 30;
var winText;

//Sets up our game
game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

//Loads required assets
function preload() {
  game.stage.backgroundColor = '#5db1ad';
  game.load.image('platform-steel', 'images/platform_1.png');
  game.load.image('platform-ground', 'images/platform_2.png')
  game.load.spritesheet('player', 'images/runner.png', 48, 62);
  game.load.spritesheet('coin', 'images/coin.png', 36, 44);
  game.load.spritesheet('badge', 'images/badge.png', 42, 54);
}
//creates our player, ground and ledges for the game
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //physicsGroup by default has enableBody = true
  platforms = game.add.physicsGroup();
  createPlatform(-40, game.world.height - 60, 'platform-ground', 3, 2);
  createPlatform(600,400, 'platform-steel');
  createPlatform(400,250, 'platform-steel');


  player = game.add.sprite(32, game.world.height-150, 'player');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.animations.add('walk');
  cursors = game.input.keyboard.createCursorKeys();

  coins = game.add.physicsGroup();
  createCoin(300,300, 'coin');
  createCoin(700,300, 'coin');
  createCoin(500,100, 'coin');


  scoreText = game.add.text(16,16, 'score: ' + score, {font: 'bold 24px Arial', fill: 'white'});
  winText = game.add.text(325, 275, "", { font: "bold 48px Arial", fill: "white" });
}
//checks when player and platform collide.
function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, coins, collectStar)

  //  Reset the players velocity (movement)
   player.body.velocity.x = 0;

   if (cursors.left.isDown)
   {
       //  Move to the left
       player.animations.play('walk', 10, true);
       player.body.velocity.x = -150;
       player.scale.x = -1;
   }
   else if (cursors.right.isDown)
   {
       //  Move to the right
       player.animations.play('walk', 10, true);
       player.body.velocity.x = 150;
       player.scale.x = 1;
   }
   else
   {
       //  Stand still is no button is pressed
       player.animations.stop();
   }

   //  Jump if they are touching the ground.
   if (cursors.up.isDown && player.body.touching.down && hitPlatform){
       player.body.velocity.y = -300;
   }
   if(win){
     winText.text = "You Win!"
   }

}

function render(){

}

function collectStar(player, star){
  star.kill();
  score+=10;
  scoreText.text = 'score: ' + score;

  if(score === winScore){
    win = true;
  }
}

function createPlatform(left, top, item, scaleX = 1, scaleY = 1){
  var ledge = platforms.create(left, top, item);
  ledge.scale.setTo(scaleX,scaleY);
  ledge.body.immovable = true;
}
function createCoin(left, top, item){
  var coin = coins.create(left,top, item);
  coin.animations.add('spin');
  coin.animations.play('spin', 10, true);
}
