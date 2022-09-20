
class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Debug" });
    }
    preload() {
        this.load.image("Char", "./sprite/Char.png")
        this.load.image("NPC", "./sprite/Square.png")
        this.load.image("Platfrom", "./sprite/Floor.png")
    }

    create() {

        // Debug text
        this.jumpdebug = this.add.text(20, 20)
        this.dialog = this.add.text(20, 50, "I used to be an adventurer like you, then I took an arrow in the knee").setAlpha(0)
        this.dialog.setOrigin(0.5, 0.5)

        // Text animated (Prototype)
        this.text = "I used to be an adventurer like you, then I took an arrow in the knee.."
        this.splitText = this.text.split("")

        let i = 0
        setInterval(() => {
            if (i < this.splitText.length) {
                if (i > 35) {
                    this.add.text(((i - 35) * 11), 135, this.splitText[i])
                } else {
                    this.add.text(20 + (i * 11), 120, this.splitText[i])
                }
                i++
            } else {
                clearInterval(this)
            }
        }, 50)


        // NPC
        this.npc = this.physics.add.sprite(this.game.config.width / 1.8, 450, "NPC").setScale(0.5)
        this.npc.setOrigin(0.5, 0.5)
        this.npc.setCollideWorldBounds(true)


        //NPC interaction zone
        this.reaction = this.add.zone(this.npc.x, this.npc.y).setSize(this.npc.width + 20, this.npc.height + 20)
        this.physics.world.enable(this.reaction)
        this.reaction.body.setAllowGravity(false)

        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "Char").setOrigin(0.5, 0.5)

        // Player attribute
        this.player.setBounce(0.1) // more Value = more bounce but if value = 0 physucs obj  will be unjump able
        this.player.setCollideWorldBounds(true)
        this.player.body.setFrictionX(0)
        this.player.setScale(2)

        // Ground Check Zone
        this.groundCheck = this.add.zone(0, 0).setSize(this.player.width * 2, 5)
        this.physics.world.enable(this.groundCheck)
        this.groundCheck.body.setAllowGravity(false)



        // Platfrom
        this.platfrom = this.physics.add.staticGroup().setOrigin(0.5, 0.5)
        this.platfrom.create(400, 500, "Platfrom")

        //Collider
        this.physics.add.collider(this.player, this.platfrom)
        this.physics.add.collider(this.npc, this.platfrom)

        //Overlap
        this.groundToken = 0// make GroundToken = time.now when player is on ground
        this.physics.add.overlap(this.groundCheck, this.platfrom, () => { 
            this.groundToken = this.time.now
         }) 

        this.talkToken = 0 // make talkToken = time.now when player is in interaction zone
        this.physics.add.overlap(this.player, this.reaction, () => {
            this.talkToken = this.time.now // Sync talkToken with current time so when they leave interaction zone they can't talk
        })

        // Charge Timer
        this.jumpTime = new Phaser.Time.TimerEvent({ delay: 1200 }) //Set how long player can charge **millisec

        //Create KeyInput
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    }

    update() {
        this.movement()
        this.Ground()
        this.dialogSys()

        

        this.progress = this.jumpTime.getProgress()
        this.jumpForce = Math.ceil(this.progress * 5 ) //Progression is value between 0 and 1. We can extend gap by multiply it. Range will be rise but time will not change at all
        this.jumpdebug.setText(["Time : " + this.progress.toString().substring(0, 4),"JumpForce : ",this.jumpForce])
    }

    // Besic movement function
    movement() {
        // X axis Movement

        if (this.left.isDown) { 
            this.player.setFlipX(true)
            this.player.setVelocityX(-playerSpeed)
        } else if (this.right.isDown) {
            this.player.setFlipX(false)
            this.player.setVelocityX(playerSpeed)
        } else {
            this.player.setVelocityX(0)
        }

        
        // Y axis movement
        
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.time.addEvent(this.jumpTime)
        }
        if (Phaser.Input.Keyboard.JustUp(this.space) && this.grounded) {
            this.jump()
        }


    }

    jump() {
        console.log('Jump: ',this.jumpForce)
        this.player.setVelocityY(-120*this.jumpForce)
    }


    //Make groundCheck follow player
    Ground() {
        this.groundCheck.x = this.player.x
        this.groundCheck.y = this.player.y + this.player.height
    }
    //
    Grounded() {
        return this.groundToken == this.time.now
    }

    dialogSys() {
        if (this.talkToken == this.time.now && Phaser.Input.Keyboard.JustDown(this.enter)) {

            this.dialog.setPosition(this.npc.x, this.npc.y - 100)
            setTimeout(() => {
                //Fade out
                this.tweens.add({
                    targets: this.dialog,
                    alpha: 0,
                    duration: 300,
                    ease: 'Power2'
                }, this);
            }, 4000)

            //Fade-in
            this.tweens.add({
                targets: this.dialog,
                alpha: 1,
                duration: 300,
                ease: 'Power2'
            }, this);
        }
    }



}