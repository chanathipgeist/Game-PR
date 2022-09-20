
class Cave extends Phaser.Scene {
    constructor() {
        super({ key: "Cave" });
    }
    preload() {
        this.load.image("Platform", "./sprite/Platform.png")
        this.load.image("PlatformY", "./sprite/PlatformY.png")
        this.load.spritesheet('Player', './sprite/fur.png', {
            frameWidth: 3072 / 3, frameHeight: 1024
        })
        this.load.spritesheet('Jump', './sprite/jump.png', {
            frameWidth: 10240 / 10, frameHeight: 1024
        })
    }

    create() {
        // Player
        this.player = this.physics.add.sprite(-43, 672, "Player")
        .setScale(0.15)
        .setSize(670, 600)
        .setOffset(230,230)
        // .setSize(1100,1400)

        this.player.setBounce(0.9,0)

        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('Player', {
                start: 0,
                end: 2
            }),
            duration: 500,    
            repeat: -1
        })

        this.anims.create({
            key: 'startJumpAni',
            frames: this.anims.generateFrameNumbers('Jump', {
                start: 0,
                end: 0
            }),
            duration: 1300,    
            repeat: -1
        })

        this.anims.create({
            key: 'jumpAni',
            frames: this.anims.generateFrameNumbers('Jump', {
                start: 1,
                end: 8
            }),
            duration: 1300,    
            repeat: -1
        })
        //this.player.setCollideWorldBounds(true)
        //this.player.body.setFrictionX(0)

        // this.cameras.main.startFollow(this.player);
        
        // PlatForm
        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 752,"Platform")
        // this.platform.create(640, -690, "Platform")
        this.platform.create(-32, 720, "PlatformY")
        this.platform.create(1321, 720, "PlatformY")
        this.platArr = []

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.jumpAble = true

        // Collinder
        this.cX = 0;
        this.physics.add.collider(this.player,this.platform)

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        this.startWalk();
        // this.movement();
        // this.admin()

        console.log(`player x = ${this.player.x} player y = ${this.player.y}`);
        //console.log(this.talkable)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    startWalk() {
        if(this.player.x <= 167) {
            this.player.anims.play('playerAni', true);
            this.player.setVelocityX(200)   
        }
        else {
            this.movement()
        }
    }

    movement() {
        if (this.Grounded() && this.player.body.velocity.y == 0 ){
            if (!this.space.isDown) {
                if (this.left.isDown) {
                    this.player.setFlipX(true)
                    this.player.anims.play('playerAni', true);
                    this.player.setVelocityX(-playerSpeed)
                }
                else if (this.right.isDown){
                    this.player.setFlipX(false)
                    this.player.anims.play('playerAni', true);
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.anims.play('playerAni', false);
                    this.player.setVelocityX(0)
                }
            } else {
                this.player.anims.play('playerAni', false);
                this.player.setVelocityX(0)
            }

            if (this.space.isDown && this.jumpAble) {
                this.player.anims.play('startJumpAni', true);
                if (this.space.getDuration() > 1200) {
                    this.player.anims.play('jumpAni', true);
                    this.player.setVelocity(this.jumpDir() , -playerSpeed * 5)
                    this.space.duration = 0
                    this.jumpAble = false
                }
            } else if (Phaser.Input.Keyboard.JustUp(this.space) && this.jumpAble) {
                this.player.anims.play('jumpAni', true);
                this.player.setVelocity(this.jumpDir() , -playerSpeed * this.space.duration/240)
                this.space.duration = 0
                this.jumpAble = false

            } else if (this.space.isUp){
                this.jumpAble = true
            }

        }
    }


    Grounded() {
        return this.platArr.includes(this.player.body.bottom)
    }

    jumpDir() {
        return !this.left.isDown ? this.right.isDown ? playerSpeed : 0 : -playerSpeed 
    }

    textAnimate(text) {
        let i = 0
        let start = setInterval(() => {
            if (i < text.length) {
                this.tweens.add({
                    targets: text[i],
                    y: text[i].y - 5,
                    alpha: 1,
                    duration: 300,
                    ease: 'Power2'
                }, this)
                i++
            } else {
                clearInterval(start)
            }
        }, 20)
        
        setTimeout(() =>{
            i = 0
            let stop = setInterval(() => {
                if (i < text.length) {
                    this.tweens.add({
                        targets: text[i],
                        y: text[i].y + 5,
                        alpha: 0,
                        duration: 300,
                        ease: 'Power2'
                    }, this)
                    i++
                } else {
                    clearInterval(stop)
                }
            }, 20)
        },4000)
    }

    admin() {
        if(this.left.isDown) {
            this.player.setVelocityX(-500);
        }
        else if (this.right.isDown) {
            this.player.setVelocityX(500);
        }
        else {
            this.player.setVelocityX(0)
        }

        if(this.up.isDown) {
            this.player.setVelocityY(-500);
        }
        else if (this.down.isDown) {
            this.player.setVelocityY(500);
        } else {
            this.player.setVelocityY(0)
        }
    }

}