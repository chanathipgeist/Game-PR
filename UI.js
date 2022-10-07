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
        
        // this.load.image("tutorialButt", "./img/element/instruction.png")
        // this.load.image("tutorial", "./img/element/pop_up_instruction1.png")
        
        // this.load.spritesheet("sound" , "./img/element/sound.png" , {
        //     frameWidth : 241 , frameHeight : 238
        // })
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
        this.menu = this.scene.get('menu')
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

        this.soundButt = this.add.sprite(1230 , 46 , "sound")
        .setOrigin(0.5,0.5)
        .setScale(0.23)
        .setInteractive()
        
        this.tutorialButt = this.add.sprite(1160 , 46 , "tutorialButt")
        .setOrigin(0.5,0.5)
        .setScale(0.23)
        .setInteractive()

        this.tutorial = this.add.image(this.game.config.width / 2 , this.game.config.height / 2 , "tutorial")
        .setOrigin(0.5,0.5)
        .setScale(0.3)
        .setAlpha(0)

        this.anims.create({
            key: 'unmute',
            frames: this.anims.generateFrameNumbers('sound', {
                start: 0,
                end: 0
            }),
            duration: 0,    
            repeat: -1
        })
        this.anims.create({
            key: 'mute',
            frames: this.anims.generateFrameNumbers('sound', {
                start: 1,
                end: 1
            }),
            duration: 0,    
            repeat: -1
        })

        
        this.soundButt.on('pointerdown' ,() => {
            this.soundButt.setScale(0.20)
            
        }).on('pointerup', () => {
            this.soundButt.setScale(0.23)
            if (!mute ) {
                this.sound.mute = true
                this.soundButt.anims.play('mute')
                mute = true
            }
            else  {
                this.sound.mute = false
                this.soundButt.anims.play('unmute')
                mute = false
            }
        })

        this.tutorialButt.on('pointerdown' ,() => {
            this.tutorialButt.setScale(0.20)
            
        }).on('pointerup', () => {
            this.tutorialButt.setScale(0.23)
            if (this.tutorial.alpha == 0) {
                this.tutorial.alpha = 1
            }
            else  {
                this.tutorial.alpha = 0
            }
        })
        
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
       
        this.progressBar = this.add.rectangle(40, 680, 20, 60, 0x00FF00).setOrigin(0, 0); // max width 20px ,max height 150px
        this.progressBar.setAlpha(0)

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.setAlpha(0)
        //  32px radius on the corners
        this.graphics.strokeRoundedRect(0, 0, 80, 10, 0)
              
    }   
    
    update() {
        // console.log( this.progressBar.height);
        if (this.ended && Phaser.Input.Keyboard.JustDown(this.r)) {
        minuteToEnd = 0 , secondToEnd = 0
        this.scene.restart()
        this.UIscene.scene.restart()
        }
        if(!this.menu.scene.isActive('menu') && loaded) {
            if(this.space.isDown) {
                this.progressBar.setAlpha(1)
                this.progressBar.height = -((this.space.getDuration() / 1200) * 150)
            } if (this.space.getDuration() > 1200) {
                this.graphics.setAlpha(1)
                this.progressBar.setAlpha(0)
            } if (Phaser.Input.Keyboard.JustUp(this.space)) {
                this.progressBar.setAlpha(0)
            }
        }
        // console.log(this.menu.scene.isActive('menu'));
        // console.log(this.space.duration);
    }
    
}
