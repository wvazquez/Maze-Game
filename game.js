//global variables
var game;
var player;
var coins;
var poisons;
var platforms;
var cursors;
var score = 0;
var winScore = 100;
var lives = 3;
var scoreText;
var livesText;
var gameOverText;
var gameOver = false;
var win = false;

function coins(){
  coins = game.add.physicsGroup();
  createCoin(300,300, 'coin');
  createCoin(700,300, 'coin');
  createCoin(500,100, 'coin');
  createCoin(300,100, 'coin');
  createCoin(400,100, 'coin');
  createCoin(500,100, 'coin');
  createCoin(440,450, 'coin');
  createCoin(320,400, 'coin');
  createCoin(320,200, 'coin');
  createCoin(320,300, 'coin');
}
function poisons(){
  poisons = game.add.physicsGroup();
  createPoison(180, 480, 'poison');
  createPoison(280, 480, 'poison');
  createPoison(500, 300, 'poison');
  createPoison(200, 440, 'poison');
  createPoison(400, 280, 'poison');
  createPoison(300, 160, 'poison');
  createPoison(300, 500, 'poison');
}

function platforms(){
  platforms = game.add.physicsGroup();
  createPlatform(-40, game.world.height - 60, 'platform-ground', 3, 2);
  createPlatform(600,400, 'platform-steel');
  createPlatform(400,250, 'platform-steel');
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

function createPoison(left, top, item){
  var poison = poisons.create(left,top, item);
  poison.animations.add('bubble');
  poison.animations.play('bubble', 8, true);
}

function collectStar(player, star){
  star.kill();
  score += 10;
  scoreText.text = 'score: ' + score;

  if(score === winScore){
    player.kill();
    win = true;
  }
}
function collectPoison(player, poison){
  poison.kill();
  lives -= 1;
  livesText.text = 'lives: ' + lives;

  if(lives === 0){
    player.kill();
    gameOver = true;
  }
}

window.onload = function(){
  //Sets up our game
  game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

  //Loads required assets
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    game.load.image('platform-steel', 'images/platform_1.png');
    game.load.image('platform-ground', 'images/platform_2.png')
    game.load.spritesheet('player', 'images/runner.png', 48, 62);
    // game.load.spritesheet('player', 'images/alien.png', 32, 48);
    game.load.spritesheet('coin', 'images/coin.png', 36, 44);
    game.load.spritesheet('poison', 'images/poison.png', 32, 32);
  }

  //creates our player, and game world
  function create() {
    player = game.add.sprite(32, game.world.height-150, 'player');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);

    coins();
    poisons();
    platforms();

    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(16,16, 'score: ' + score, {font: 'bold 24px Arial', fill: 'white'});
    livesText = game.add.text(685, 16, 'lives: ' + lives, {font: 'bold 24px Arial', fill: 'white'});
    gameOverText = game.add.text(game.world.centerX, 250, "", { font: "bold 48px Arial", fill: "white" });
    gameOverText.anchor.setTo(0.5, 1);
  }
  //checks when player and platform collide.
  function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, coins, collectStar);
    game.physics.arcade.overlap(player, poisons, collectPoison);

    //  Reset the players velocity (movement)
     player.body.velocity.x = 0;

     if (cursors.left.isDown){
         //  Move to the left
         player.animations.play('walk', 10, true);
         player.body.velocity.x = -150;
         player.scale.x = -1;
     }
     else if (cursors.right.isDown){
         //  Move to the right
         player.animations.play('walk', 10, true);
         player.body.velocity.x = 150;
         player.scale.x = 1;
     }
     else{
         //  Stand still is no button is pressed
         player.animations.stop();
     }
     //  Jump if they are touching the ground.
     if (cursors.up.isDown && player.body.touching.down && hitPlatform){
         player.body.velocity.y = -300;
     }
     if (win) {
        gameOverText.text = "YOU WIN!";
     }
     if (gameOver) {
      gameOverText.text = "GAME OVER!";
     }

  }

  function render(){

  }
};
