var playerSpeed = 200;

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug : false
        }
    },
    scene: [GameScene]
};

var game = new Phaser.Game(config);