
const config = {
    width: 540,
    height: 960,
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