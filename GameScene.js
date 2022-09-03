class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image("Player", "./sprite/Player.png")
        this.load.image("Platform", "./sprite/Platform.png")
    }

    create() {
        this.add.text(20, 20, "TEST")
        this.jumpdebug = this.add.text(20,40)

        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "Player").setOrigin(0.5, 0.5)

        this.player.setBounce(0.9,0)
        this.player.setCollideWorldBounds(true)
        this.player.body.setFrictionX(0)

        // PlatForm

        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 700,"Platform")

        // craete ground check zone
        this.groundCheck = this.add.zone(0, 0).setSize(this.player.width, 5)
        this.physics.world.enable(this.groundCheck)
        this.groundCheck.body.setAllowGravity(false)

        this.physics.add.overlap(this.groundCheck, this.platform, () => {
            this.jumpToken = this.time.now
        })

        // Collinder

        this.physics.add.collider(this.player,this.platform)

        // Time Event
        this.jumpTime = new Phaser.Time.TimerEvent({ delay: 1200 })
        this.jumpAble = true

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        this.movement()
        this.Ground()
        console.log(this.jumpAble)

        this.progress = this.jumpTime.getProgress()
        this.jumpForce = Math.ceil(this.progress * 5 ) //Progression is value between 0 and 1. We can extend gap by multiply it. Range will be rise but time will not change at all
        this.jumpdebug.setText(["Time : " + this.progress.toString().substring(0, 4),"JumpForce : ",this.jumpForce])
    }

    movement() {
        // X axis Movement
        
        if (this.Grounded())
        {
            if (this.left.isDown) { 
                this.player.setFlipX(true)
                this.player.setVelocityX(-playerSpeed)
            } else if (this.right.isDown) {
                this.player.setFlipX(false)
                this.player.setVelocityX(playerSpeed)
            } else {
                this.player.setVelocityX(0)
            }

            // Y axis Movement
            
            if (Phaser.Input.Keyboard.JustDown(this.space)) {
                this.time.addEvent(this.jumpTime)
            } 
            else if (this.space.isDown) {
                console.log('Isdown')
                this.player.setVelocityX(0)
                if (this.progress == 1 && this.jumpAble) 
                {
                    this.player.setVelocityY(-150 * this.jumpForce)
                    this.jumpAble = false
                }
            } else if (Phaser.Input.Keyboard.JustUp(this.space) && this.jumpAble){
                this.player.setVelocityY(-150 * this.jumpForce)
                this.jumpAble = false
            }

            if (!this.space.isDown) {
                this.jumpAble = true
            }
            
        } 
    }

    // Make ground checker follow player
    Ground() {
        this.groundCheck.x = this.player.x
        this.groundCheck.y = this.player.y + this.player.height/2
    }

    Grounded() {
        return this.jumpToken == this.time.now
    }

}