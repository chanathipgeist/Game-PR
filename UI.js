class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI"})
        Phaser.Scene.call(this, { key: 'UI', active: true });
    }
    create() {
        this.timeText = this.add.text(20, 20);
                
        this.dialogSet = [
            "Only the worthy one can get that water. Do you thing you're worth enought?",
            "You can buy my drink for 2 buck instead for that water",
            "This is boring",
            "*Yawn*"
        ]

        this.TalkAble = true
        
       
        this.testBox = this.add.graphics().fillGradientStyle(0x00000,0x00000,0x00000,0x00000, 0,0,1,1).setAlpha(0)
        this.testBox.fillRect(0,this.game.config.height - 200,this.game.config.width, 200)
        this.dialog =  this.add.text(0,0).setAlpha(0)

        this.UIscene = this.scene.get('GameScene')
        this.UIscene.events.on('Talk', () => {
            this.tweens.add({
                targets: this.testBox,
                alpha: 1,
                duration: 300
            })

            setTimeout(() => {
                this.tweens.add({
                    targets: this.testBox,
                    alpha: 0,
                    duration: 300
                })
            } , 3000)
            this.textAnimate(this.dialogSet[Math.floor(Math.random()*this.dialogSet.length)])
        }
        )

        this.timing = this.time.addEvent({
            delay: 0,  
            callback: (()=>{
                console.log("timer has finished!");
            }),
        });

        this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    
        this.timing.paused = true

        this.UIscene.events.on('start', () => {
            this.timing.delay = this.checkTime
            // this.timer(time)
            this.timing.paused = false
        }
        )
    }   
    
    update() {
        this.checkTime++;
        //this.timing.delay = time
        // this.timer(time)
        if(this.c.isDown) {
            this.timing.paused = true
            this.elapsedTimeToMinSec(this.timing.getElapsed())
            console.log('Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit);
        }
        this.timer(this.timing.getElapsed())
        // console.log(this.timing.getElapsed());
    }
    
    timer() {
        this.elapsedTimeToMinSec(this.timing.getElapsed())
        this.timeText.setText('Time: ' + this.minuteTwoUnit + ':' + this.secondTwoUnit);
    }

    elapsedTimeToMinSec(elapsedTime) {
        this.minute = Math.floor(elapsedTime / 1000) / 60
        this.second = Math.floor(elapsedTime /1000) % 60;
        this.minuteTwoUnit = parseInt(this.minute, 10) > 9? "" + parseInt(this.minute, 10): "0" + parseInt(this.minute, 10)
        this.secondTwoUnit = this.second > 9 ? "" + this.second: "0" + this.second;
    }

    textAnimate(text) {
        this.dialog.setText(text).setOrigin(0.5,0.5).setOrigin(0,0).setPosition(20,this.game.config.height - 120).setAlpha(0).setFontSize(25).setFontStyle("Bold")
        this.tweens.add({
            targets: this.dialog,
            y: this.dialog.y - 5,
            alpha: 1,
            duration: 300
        },this)


        setTimeout(() => {
            this.tweens.add({
                targets: this.dialog,
                y: this.dialog.y + 5,
                alpha: 0,
                duration: 300
            },this)
            setTimeout(() => {
                this.TalkAble = true
            } , 300)
        } , 3000)
    }
}
