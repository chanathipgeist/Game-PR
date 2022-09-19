
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image("Player", "./sprite/Player.png")
        this.load.image("Platform", "./sprite/Platform.png")
        this.load.image("lv2", "./sprite/lv2.png")
        this.load.image("lv3", "./sprite/lv3.png")
        this.load.image("npc", "./sprite/npc.jpg")
    }

    create() {
        //bg
        this.add.image(0, -720 * 2, 'lv2').setOrigin(0, 0)
        this.add.image(0, -720, 'lv3').setOrigin(0, 0)
        this.add.image(0, 0, 'lv2').setOrigin(0, 0)

        this.dialogSet = [
            "Only the worthy one can get that water. Do you thing you're worth enought?",
            "You can buy my drink for 2 buck instead for that water",
            "This is boring",
            "*Yawn*"
        ]
        
        this.text  = this.dialogSet[0].split("")
        this.textSet = []
        for (const i in this.text) {
            this.textSet.push(this.add.text( 20 + i * 10 , 40 , this.text[i]).setAlpha(0))
        }
        
        
        this.dialog = this.add.text(0,0).setOrigin(0.5,0.5).setAlpha(0)

        // Player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "Player")
        .setOrigin(0.5, 0.5)
        .setScale(0.08)
        .setSize(1100,1400)

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
        // this.cameras.main.startFollow(this.player);
        
        // PlatForm

        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(640, 752,"Platform")
        this.platform.create(0, 500,"Platform")
        this.platform.create(-200, -100,"Platform")
        this.platform.create(900, -300,"Platform")
        this.platArr = []

        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.jumpAble = true

        //npc
        this.npcLevel1 = this.physics.add.image(200, 400, "npc").setImmovable().setScale(0.5)
        this.npcLevel1.body.setAllowGravity(false)
        this.physics.add.overlap(this.player, this.npcLevel1, () => {
            this.talkable = true;
            this.talkLevel1()
        });

        this.npcLevel2 = this.physics.add.image(600,  300 + -720, "npc").setImmovable().setScale(0.5)
        this.npcLevel2.body.setAllowGravity(false)
        this.physics.add.overlap(this.player, this.npcLevel2, () => {
            this.talkable = true;
            this.talkLevel2()
        });

        this.talkable = false;

        // Collinder
        this.cX = 0;
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
        //console.log(this.talkable)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    talkLevel1() {
        if(this.talkable && this.enter.isDown) {
            var npcTalk = this.add.text(this.npcLevel1.x - 50, this.npcLevel1.y - 190, 'Hello Fennec')
            setTimeout(function(){
                npcTalk.destroy()
            }, 2000)
            //console.log('talking')
        }
    }

    talkLevel2() {
        if(this.talkable && this.enter.isDown) {
            var npcTalk = this.add.text(this.npcLevel2.x - 50, this.npcLevel2.y - 190, 'Hard?')
            setTimeout(function(){
                npcTalk.destroy()
            }, 2000)
            //console.log('talking')
        }
    }

    movement() {
        if (this.Grounded() && this.player.body.velocity.y == 0 ){
            if (!this.space.isDown) {
                if (this.left.isDown) {
                    this.player.setFlipX(false)
                    this.player.setVelocityX(-playerSpeed)
                }
                else if (this.right.isDown){
                    this.player.setFlipX(true)
                    this.player.setVelocityX(playerSpeed)
                } else {
                    this.player.setVelocityX(0)
                }
            } else {
                this.player.setVelocityX(0)
            }

            if (this.space.isDown && this.jumpAble) {
                if (this.space.getDuration() > 1200) {
                    this.player.setVelocity(this.jumpDir() , -playerSpeed * 5)
                    this.space.duration = 0
                    this.jumpAble = false
                }
            } else if (Phaser.Input.Keyboard.JustUp(this.space) && this.jumpAble) {
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

}