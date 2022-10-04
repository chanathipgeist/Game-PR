class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI"})
        Phaser.Scene.call(this, { key: 'UI', active: true });
    }
    preload() {
        this.load.image("mojitoDeco" , "./img/element/mojito.png")
        this.load.image("paper" , "./img/element/Paper.png")
        this.load.spritesheet("fennec" , "./img/sprite/sitFennec.png" , {
            frameWidth : 432 , frameHeight : 324
        })
    }
    create() {
        this.ended = false

        this.dim = this.add.rectangle( this.game.config.width / 2 , this.game.config.height / 2  , 1280 , 720 , 0x000000)
        .setOrigin(0.5,0.5)
        .setAlpha(0)

        this.paper = this.add.image(this.game.config.width / 2 , this.game.config.height / 2 , "paper")
        .setScale(0.75)
        .setAlpha(0)

        

        this.moji = this.add.image(  373 , 453 , "mojitoDeco")
        .setOrigin(0.5,0.5)
        .setScale(0.5)
        .setAlpha(0)
        .setAngle(-25)
        .setFlipX(true)

        this.timeTotal = this.add.text(690 , 320 , "Total Time" , {fontFamily: 'gameFont3' , fontSize: 45 , color: '#5F421B'})
        .setOrigin(0.5,0.5)
        .setAlpha(0)
        this.yourTime = this.add.text(690 , 430, "" , {fontFamily: 'gameFont3' , fontSize: 40 , color: '#5F421B'})
        .setOrigin(0.5,0.5)
        .setAlpha(0)
        this.con = this.add.text(690 , 485 , "Press SpaceBar to restart game" , {fontFamily: 'gameFont3' , fontSize: 18 , color: '#5F421B'})
        .setOrigin(0.5,0.5)
        .setAlpha(0)

        this.fennec = this.add.sprite(980,480,"fennec")
        .setOrigin(0.5,0.5)
        .setAlpha(0)
        .setFlipX(true)

        this.anims.create({
            key: 'BLINK',
            frames: this.anims.generateFrameNumbers('fennec', {
                start: 0,
                end: 6
            }),
            duration: 400,
            yoyo : true    
        })

        this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(2000,10000), callback : () => {
            this.fennec.anims.play("BLINK" , true)
        } , loop : true } );

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
            this.paper.setAlpha(1)
            this.fennec.setAlpha(1)
            this.moji.setAlpha(1)
            this.timeTotal.setAlpha(1)
            this.yourTime.setAlpha(1)
            this.con.setAlpha(1)
            this.yourTime.setText(`${minuteToEnd} : ${secondToEnd}`)
            this.ended = true
        }
        )
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
       
        
            
        
        
    }   
    
    update() {
        if (this.ended && Phaser.Input.Keyboard.JustDown(this.space)) {
        minuteToEnd = 0 , secondToEnd = 0
        location.reload()
        // this.scene.stop("GameScene").start('menu')
        // this.scene.restart()
        }
    }

    result() {
        
    }
    
}
