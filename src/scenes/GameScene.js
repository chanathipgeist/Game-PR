
class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        
    }

    create() {
        this.add.text(20,20,"TEST", { fontSize: "50px"})

    }

    update() {

    }
}
