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

  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(-40, game.world.height -60, 'platform-ground');
  ground.scale.setTo(3,2);
  ground.body.immovable = true;

  var ledge = platforms.create(600,400, 'platform-steel');
  ledge.body.immovable = true;
  ledge = platforms.create(400,250, 'platform-steel');
  ledge.body.immovable = true;

  player = game.add.sprite(32, game.world.height-150, 'player');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.animations.add('walk');
  cursors = game.input.keyboard.createCursorKeys();

  coins = game.add.group();
  coins.enableBody = true;
  var coin = coins.create(300,300, 'coin');
  coin.animations.add('spin');
  coin.animations.play('spin', 10, true);

  coin = coins.create(700,300, 'coin');
  coin.animations.add('spin');
  coin.animations.play('spin', 10, true);

  coin = coins.create(500,100, 'coin');
  coin.animations.add('spin');
  coin.animations.play('spin', 10, true);

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

   //  Allows the player to jump if they are touching the ground.
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
