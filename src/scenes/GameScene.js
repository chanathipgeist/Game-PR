
class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        
    }

    create() {
        this.add.text(20,20,"Scene: GameScene", { fontSize: "25px"})
        
    }

    update() {

    }
}
