var playerSpeed = 200;

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
    scene: [GameScene, UI]
};

var game = new Phaser.Game(config);