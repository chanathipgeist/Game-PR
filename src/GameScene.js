
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
        //this.player.setCollideWorldBounds(true)
        //this.player.body.setFrictionX(0)

        // zone scene
        this.scene4 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5) 
        this.physics.world.enable(this.scene4)
        this.scene4.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene4, () => {
            this.cameras.main.pan(this.scene3.x, this.scene3.y, 0, 'Power2')
        })

        this.scene3 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene3)
        this.scene3.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene3, () => {
            this.cameras.main.pan(this.scene3.x, this.scene3.y, 0, 'Power2')
        })

        this.scene2 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene2)
        this.scene2.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene2, () => {
            this.cameras.main.pan(this.scene2.x, this.scene2.y, 0, 'Power2')
        })

        this.scene1 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene1)
        this.scene1.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene1, () => {
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 0, 'Power2')
        })
        //this.cameras.main.startFollow(this.player);
        
        // PlatForm

        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 700,"Platform")
        this.platform.create(0, 500,"Platform")
        this.platform.create(-200, -100,"Platform")
        this.platform.create(900, -300,"Platform")
        this.platArr = []

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.jumpAble = true

        // Collinder

        this.physics.add.collider(this.player,this.platform)

        // set zone scenes 

        this.scene1.x = (this.game.config.width / 2);
        this.scene1.y = (this.game.config.height / 2);
        
        this.scene2.x = (this.game.config.width / 2);
        this.scene2.y = -(this.game.config.height / 2) * 1;

        this.scene3.x = (this.game.config.width / 2);
        this.scene3.y = -(this.game.config.height / 2) * 3;

        this.scene4.x = (this.game.config.width / 2);
        this.scene4.y = -(this.game.config.height / 2) * 5;

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)


    }

    update() {
        this.movement()
        console.log(this.scene1.y)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    movement() {
        // X axis Movement
        if (this.Grounded()){
            this.dur = this.space.duration
            if (!this.space.isDown) {
               if (this.left.isDown) { 
                    this.player.setFlipX(true)
                    this.player.setVelocityX(-playerSpeed)
                } else if (this.right.isDown) {
                    this.player.setFlipX(false)
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.setVelocityX(0)
                } 
            } else {
                this.player.setVelocityX(0)
            }
            
            // Y axis Movement
            if (!this.space.isDown) this.jumpAble = true
            if (this.jumpAble) {
                if (this.space.getDuration() >= 1200) {
                   this.player.setVelocity(this.jumpDir(),-playerSpeed * 5)
                    this.space.duration = 0
                    this.jumpAble = false 
                }
                switch (true) {
                case (this.dur / 240) == 0 :
                    break
                case (this.dur / 240) < 1 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 2 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 2)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 3 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 3)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
                case (this.dur / 240) < 4 :
                    this.player.setVelocity(this.jumpDir(),-playerSpeed * 4)
                    this.space.duration = 0
                    this.jumpAble = false
                    break
            }

                
            }
            
            
        } 
    }


    Grounded() {
        return this.platArr.includes(this.player.body.bottom)
    }

    jumpDir() {
        return !this.left.isDown ? this.right.isDown ? playerSpeed : 0 : -playerSpeed 
    }

}