var playerSpeed = 200;
var mute = false;
var minuteToEnd = 0;
var secondToEnd = 0;

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
                gravity: { 
                    y: 1800 },
            debug : true
        }
    },
    scene: [menu, GameScene]
};

var game = new Phaser.Game(config);