
const config = {
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    },
    scene: [ GameScene ]
}

const game = new Phaser.Game(config);

