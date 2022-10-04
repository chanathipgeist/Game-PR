class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI"})
        Phaser.Scene.call(this, { key: 'UI', active: true });
    }
    create() {
        this.add.text(20,20,"TEST")
        this.dim = this.add.rectangle( this.game.config.width / 2 , (this.game.config.height / 2)  , 1280 , 720 , 0x000000).setOrigin(0.5,0.5).setAlpha(0)
        this.setDim = this.tweens.add({
            targets : this.dim,
            alpha : 0.7 ,
            duration : 700,
            paused : true
        }).pause()
        this.UIscene = this.scene.get('GameScene')
        this.UIscene.events.on('ending', () => { 
            this.UIscene.scene.pause()
            this.setDim.play()
        }
        )
        
    }   
    
    update() {
    
    }

    result() {
        
    }
    
}
