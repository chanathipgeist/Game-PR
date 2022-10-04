class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.image('caveDoor', './img/element/entrycave1.png')
        this.load.image("Platform", "./img/element/Platform.png")
        this.load.image("Platform2", "./img/element/Platform2.png")
        this.load.image("Platform3", "./img/element/Platform3.png")
        this.load.image("slope", "./img/element/Slope.png")
        this.load.image("ground", "./img/element/ground.png")
        this.load.image("poleRoman", "./img/element/RomanPole.png" )
        this.load.image("saloon", "./img/element/Saloon_Entrance.png")
        this.load.image("sign", "./img/element/sign1.png")
        this.load.image("camp", "./img/element/camp.png")
        this.load.image("mojitoStand", './img/element/MojitoPedestal.png')
        this.load.image("borderX", './img/element/borderX.png')
        this.load.image("borderY", './img/element/borderY.png')
        this.load.image("mojito", './img/element/mojito.png');
        this.load.image("lv1", './img/bg/lv1.png')
        this.load.image("lv2", "./img/bg/lv2.png")
        this.load.image("lv3", "./img/bg/lv3.png")
        this.load.image("lv4", "./img/bg/lv4.jpg")
        this.load.image("caveWall", './img/bg/caveWall.PNG')
        this.load.audio("bgSound", './music/gameBG.mp3')
        this.load.image('ladder', './img/element/ladder.png')
        this.load.spritesheet('Player', './img/sprite/player.png', {
            frameWidth: 270 / 3, frameHeight: 90
        })
        this.load.spritesheet('Jump', './img/sprite/Jump.png', {
            frameWidth: 900 / 10, frameHeight: 90
        })
        this.load.spritesheet('fire','./img/sprite/fire.png', {
            frameWidth: 195 / 3, frameHeight: 65
        })
        this.load.spritesheet('climb', './img/sprite/climb.png', {
            frameWidth: 90, frameHeight: 90
        })
    }

    create() {
        this.sound.mute = mute
   
        //bg scene
        this.add.image(0, -720 * 3, 'lv4').setOrigin(0, 0)
        this.add.image(1280, -720 * 2, 'caveWall').setOrigin(0, 0)
        this.add.image(0, -720 * 2, 'lv3').setOrigin(0, 0)
        this.add.image(0, -720, 'lv2').setOrigin(0, 0)
        this.add.image(0, 0, 'lv1').setOrigin(0, 0)

        this.ladder = this.physics.add.image(150, -395, 'ladder').setScale(0.3).setImmovable()
        this.ladder.setSize(340,102*12).setOffset(150, -920)
        this.ladder.body.setAllowGravity(false)

        this.ladder2 = this.add.image(150, -497, 'ladder').setScale(0.3)
        this.ladder3 = this.add.image(150, -599, 'ladder').setScale(0.3)
        this.ladder3 = this.add.image(150, -701, 'ladder').setScale(0.3)

        this.timeText1 = this.add.text(5, 20)
        this.timeText2 = this.add.text(5, 20)
        this.timeText3 = this.add.text(5, 20)
        this.timeText4 = this.add.text(5, 20)
        this.timeTextCave = this.add.text(5, 20)


        this.anims.create({
            key: 'touchAni',
            frames: this.anims.generateFrameNumbers('fire', {
                start: 0,
                end: 2
            }),
            duration: 700,    
            repeat: -1,
        })
        
        this.add.image(1170, -1159, "sign").setScale(0.24)
        this.fire1 = this.add.sprite(280, -185, "fire")
       

        this.fire1.anims.play('touchAni', true)

        

        // PlatForm
        this.platform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        this.platform.create(150, -255, "saloon").setSize(115, 40).setOffset(45, 10)
        this.platform.create(200, 230,"poleRoman").setScale(0.9).setSize(250, 300).setOffset(30, 50)
        this.platform.create(640, 740,"ground").setSize(1280, 230)
        this.platform.create(640+1280, -690, "ground").setSize(1280, 230) // stand on cave
        this.platform.create(-64, 0, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(1280, 0, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(-64, -720, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(1280, -720, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(-64, -720 * 2, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(1280 * 2, -720 * 2, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(-64, -720 * 3, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(1280, -720 * 3, "borderY").setOrigin(0, 0).setOffset(32, 360)
        this.platform.create(0, -720*3 - 64, "borderX").setOrigin(0, 0).setOffset(640, 30)
        this.platArr = []
        for (let i in this.platform.getChildren()) {
            this.platArr[i] = this.platform.getChildren()[i].body.top
        }

        this.fire2 = this.add.sprite(2050, -820, "fire")
        this.fire2.anims.play('touchAni', true)

        this.add.image(1911, -900, "camp").setScale(0.5)
        this.add.image(2186, -900, "camp").setScale(0.5)

        this.slopeB = this.physics.add.image(450,-580, 'slope').setScale(0.5).setSize(20, 450).setOffset(120, 20)
        this.slopeB.body.setAllowGravity(false)
        this.slopeB.setImmovable()


        this.dirtPlatform = this.physics.add.staticGroup().setOrigin(0.5,0.5)
        //-----scene1-----
        this.dirtPlatform.create(660, 550, 'Platform2').setScale(0.5).setSize(160, 20).setOffset(82, 40);
        this.dirtPlatform.create(380, 430, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(930, 440, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1150, 380, 'Platform3').setScale(0.6).setSize(124, 20).setOffset(45, 55);
        this.dirtPlatform.create(650, 330, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(850, 190, 'Platform2').setScale(0.5).setSize(160, 20).setOffset(82, 40);
        this.dirtPlatform.create(1180, 100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(550, 120, 'Platform3').setScale(0.4).setSize(70, 20).setOffset(70, 70);
        //-----scene1-----
        //-----scene2-----
        this.dirtPlatform.create(700,-80, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1080,-130, 'Platform2').setScale(0.8).setSize(250, 20).setOffset(39, 25);
        this.dirtPlatform.create(900,-300, 'Platform3').setScale(0.5).setSize(100, 20).setOffset(55, 65);
        this.dirtPlatform.create(660,-380, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(450,-290, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        // slope
        this.dirtPlatform.create(660,-600, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        //-----scene2-----
        //-----scene3----- merge Cave
        this.dirtPlatform.create(540, -850, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);;
        this.dirtPlatform.create(350, -950, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);;
        this.dirtPlatform.create(120, -1100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(400, -1300, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(300, -740, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(720, -1500, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(830, -1250, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1200, -1100, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(1400, -900, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        //-----scene3-----
        //-----scene4----- 1140, -1159
        this.dirtPlatform.create(300, -1540, 'Platform2').setScale(1.4).setSize(420, 20).setOffset(-39, -10);
        this.dirtPlatform.create(500, -1800, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(200, -1900, 'Platform').setScale(0.9).setSize(140, 20).setOffset(11, 5);
        this.dirtPlatform.create(700, -1990, 'Platform3').setScale(0.6).setSize(120, 20).setOffset(45, 57);
        this.dirtPlatform.create(1180, -1700, 'Platform2').setScale(1.5).setSize(350, 20).setOffset(-70, -10);
        this.dirtPlatform.create(1174, -1870, "mojitoStand").setScale(0.4).setSize(110, 200).setOffset(190, 170)
        //-----scene4-----
        this.grassPlatArr = []

        for (let i in this.dirtPlatform.getChildren()) {
            this.grassPlatArr[i] = this.dirtPlatform.getChildren()[i].body.top
        }

        this.fire3 = this.add.sprite(200, -1638, "fire")
        this.fire3.anims.play('touchAni', true)

        this.mojito = this.physics.add.image(1174, -1980, 'mojito').setScale(0.24)
        this.mojito.body.setAllowGravity(false)
    

        //  476.33333333333195 player y 579
        this.player = this.physics.add.sprite(180, 579, "Player")
        .setSize(50, 70)
        .setOffset(20, 21)
        // .setSize(1100,1400)
                
        this.player.setBounce(0.9,0)
        
        //text
        this.finalTimeText = this.add.text(300 + 1280, -710 * 2);

        this.physics.add.collider(this.player, this.slopeB)

        this.physics.add.overlap(this.player, this.ladder, () => {
            if(this.up.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityY(-100)
                this.player.body.setAllowGravity(false)
            } else if (this.down.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityY(100)
            }

            if(this.up.isDown && this.right.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityX(0)
                this.player.setVelocityY(-100)
                this.player.body.setAllowGravity(false)
            } else if (this.down.isDown && this.right.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityY(100)
            }

            if(this.up.isDown && this.left.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityX(0)
                this.player.setVelocityY(-100)
                this.player.body.setAllowGravity(false)
            } else if (this.down.isDown && this.left.isDown) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityY(100)
            }

            if(this.up.isDown && !this.Grounded()) {
                this.player.x = 158
                this.player.anims.play('climbAni', true);
                this.player.setVelocityX(0)
                this.player.setVelocityY(-100)
                this.player.body.setAllowGravity(false)
            }
        })

        this.checkLadderTop = this.add.zone(145, -847).setSize(50, 50).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.checkLadderTop)
        this.checkLadderTop.body.setAllowGravity(false)

        this.physics.add.overlap(this.player, this.checkLadderTop, () => {
            this.player.setVelocityX(300)
            this.player.setVelocityY(-100)
        })

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
            duration: 1100,    
            repeat: -1
        })

        this.anims.create({
            key: 'climbAni',
            frames: this.anims.generateFrameNumbers('climb', {
                start: 0,
                end: 1
            }),
            duration: 1100,    
            repeat: -1
        })
        //this.player.setCollideWorldBounds(true)
        //this.player.body.setFrictionX(0)

        //cave scene
        this.caveZone = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.caveZone)
        this.caveZone.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.caveZone, () => {
            this.cameras.main.pan(this.caveZone.x, this.caveZone.y, 0, 'Power2')
        })

        // zone scene
        this.scene4 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5) 
        this.physics.world.enable(this.scene4)
        this.scene4.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene4, () => {
            this.cameras.main.pan(this.scene4.x, this.scene4.y, 0, 'Power2')
        })

        this.scene3 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene3)
        this.scene3.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene3, () => {
            this.cameras.main.pan(this.scene3.x, this.scene3.y, 0, 'Power2')
            setTimeout(()=>{
                this.player.body.setAllowGravity(true)
            }, 1000)
            setTimeout(()=>{
                this.checkLadderTop.x = -100
            }, 2000)
        })

        this.scene2 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene2)
        this.scene2.body.setAllowGravity(false)

        this.physics.add.overlap(this.player,this.scene2, () => {
            this.cameras.main.pan(this.scene2.x, this.scene2.y, 0, 'Power2')
            this.checkLadderTop.x = 145
        })

        this.scene1 = this.add.zone(0, 0).setSize(this.game.config.width, this.game.config.height).setOrigin(0.5, 0.5)
        this.physics.world.enable(this.scene1)
        this.scene1.body.setAllowGravity(false)

        this.scene1o = this.physics.add.overlap(this.player,this.scene1, () => {
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 0, 'Power2')
        })
        // this.cameras.main.startFollow(this.player);    

        


        // this.finnish = this.physics.add.image(2100, -750, 'Platform').setOrigin(0.5,0.5).setImmovable()
        // this.finnish.body.setAllowGravity(false)

        // this.physics.add.collider(this.player, this.finnish, () => {
        //     this.finnish.destroy();
        //     this.timing.paused = true
        //     console.log(this.timeText());
        // })

        this.jumpAble = true

        // Collinder
        this.cX = 0;
        this.physics.add.collider(this.player,this.platform)
        this.physics.add.collider(this.player, this.dirtPlatform)
        // set zone scenes 

        this.scene1.x = (this.game.config.width / 2);
        this.scene1.y = (this.game.config.height / 2);
        
        this.scene2.x = (this.game.config.width / 2);
        this.scene2.y = -(this.game.config.height / 2) * 1;

        this.scene3.x = (this.game.config.width / 2);
        this.scene3.y = -(this.game.config.height / 2) * 3;

        this.scene4.x = (this.game.config.width / 2);
        this.scene4.y = -(this.game.config.height / 2) * 5;

        this.caveZone.x = (this.game.config.width / 2) + 1280;
        this.caveZone.y = this.scene3.y

        //posText 
        this.timeTextCave.x = this.caveZone.x -620 ;
        this.timeTextCave.y = this.caveZone.y -350;

        this.timeText4.x = this.scene4.x -450 ;
        this.timeText4.y = this.scene4.y -350;

        this.timeText3.x = this.scene3.x -620 ;
        this.timeText3.y = this.scene3.y -350;

        this.timeText2.x = this.scene2.x -620 ;
        this.timeText2.y = this.scene2.y -350;

        this.timeText1.x = this.scene1.x -620 ;
        this.timeText1.y = this.scene1.y -350;

        // Keyboard Input
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    
        this.timing = this.time.addEvent({
            delay: 0,  
            callback: (()=>{
                console.log("timer has finished!");
            }),
        });

        this.physics.add.overlap(this.player, this.mojito, () => {
            this.mojito.destroy();
            this.timing.paused = true;
            console.log(minuteToEnd);
            console.log(secondToEnd);
        })

        this.timing.paused = true

        this.dim = this.add.rectangle(0,0, this.game.config.width * 2 , this.game.config.height * 2 , 0x000000 )
        .setOrigin(0,0)
        .setAlpha(0)

        this.load.once('complete' , this.sceneStart, this)
        this.load.start()

        


    }

    update() {
        this.checkTime++
        if (this.loaded){
            this.movement()
            if (Phaser.Input.Keyboard.JustDown(this.enter)) {
                this.events.emit('Talk')
            }
            this.input.keyboard.on("keydown" , () => {   
                if(this.second > 0) {

                }
                else {
                    this.timing.delay = this.checkTime;
                    this.elapsedTimeToMinSec(this.timing.getElapsed())
                    this.timing.paused = false
                }
            }
            )
    
        //     if(this.c.isDown) {
        //        this.timing.paused = true
        //        console.log('Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit);
        //    }
            this.timer()
        }
        if(this.slopeB.x >= 450) {
            this.slopeB.setVelocityX(0)
            setTimeout(()=>{
                this.slopeB.setVelocityX(-50)
            }, 3000)
        } else if (this.slopeB.x <= 400) {
            this.slopeB.setVelocityX(0)
            setTimeout(()=>{
                this.slopeB.setVelocityX(50)
            }, 3000)
        }
        // console.log(this.BGmusic.isPlaying);
        // console.log('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        // console.log(this.player.body.velocity);
        //console.log(this.scene1.active);
        // this.admin()
        console.log(`player x ${this.player.x} player y ${this.player.y}`);
        //console.log(this.player.body.height);
        //console.log(this.player.body.width);
        //console.log(this.talkable)
        //this.scene1.x = this.game.config.width;
        //this.scene1.y = this.game.config.height;
    }

    timer() {
        this.elapsedTimeToMinSec(this.timing.getElapsed())
        this.timeText1.setText(this.timeText());
        this.timeText2.setText(this.timeText());
        this.timeText3.setText(this.timeText());
        this.timeText4.setText(this.timeText());
        this.timeTextCave.setText(this.timeText());
    }

    timeText() {
        return 'Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit
    }

    elapsedTimeToMinSec(elapsedTime) {
        this.minute = Math.floor(elapsedTime / 1000) / 60
        this.second = Math.floor(elapsedTime /1000) % 60;
        this.minuteTwoUnit = parseInt(this.minute, 10) > 9? "" + parseInt(this.minute, 10): "0" + parseInt(this.minute, 10)
        this.secondTwoUnit = this.second > 9 ? "" + this.second: "0" + this.second;
        minuteToEnd = this.minuteTwoUnit
        secondToEnd = this.secondTwoUnit
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
        return this.platArr.includes(this.player.body.bottom) || this.grassPlatArr.includes(this.player.body.bottom)
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

    sceneStart() {
        this.dim = this.add.rectangle(0, 0, 1280, 720, 0x000000).setAlpha(1).setOrigin(0, 0)
        this.add.tween({
            targets: this.dim,
            alpha: 0,
            duration: 1000
        })
        this.cameras.main.startFollow(this.player)
        this.cameras.main.zoomTo(3.5 ,0)
        this.player.anims.play('playerAni', true);
        this.scene1o.active = false;
        this.tweens.add({
            targets: this.dim,
            alpha: 0,
            duration: 1500
        })
        this.tweens.add({
            targets: this.player,
            x: this.player.x + 250,
            duration: 2000
        })
        setTimeout(() => {
            this.cameras.main.stopFollow(this.player)
            this.cameras.main.pan(this.scene1.x, this.scene1.y, 500, 'Power2')
            this.cameras.main.zoomTo(1,500)
            this.player.anims.play('playerAni', false)
            this.instruction = this.add.text(221, 646, "Hold SpaceBar to Jump Higher, Longer you hold higher you can reach.")
            .setOrigin(0, 0.5)
            .setAlpha(0)
            .setColor("#5F421B")
            .setFontSize(20)
            .setFontStyle('bold')
            this.tweens.add({
                targets: this.instruction,
                alpha: 1,
                duration: 1000
            })
            this.tweens.add({
                targets: this.instruction,
                alpha: 0,
                x: this.instruction.x + 50,
                duration: 700,
                delay: 12000
            })
            this.scene1o.active = true;
            this.loaded = true
        },2000)

        this.sound.stopAll()
        this.sound.resumeAll()
        this.BGmusic = this.sound.add("bgSound")
        this.BGmusic.play({loop: true, volume: 0.15})
        // this.loaded = true;
    }

    
}