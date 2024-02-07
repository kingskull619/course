export class BowlingGame {
    
    private rolls: number[] = []
    private readonly FRAMES = 10

    public roll(pins: number){
        this.rolls.push(pins)
        return this
    }

    public getScore(){
        let score = 0
        let firstTry = 0

        for (let frame = 0; frame < this.FRAMES; frame++) {
            if(this.isStrike(firstTry)){
                score += this.scoreForStrike(firstTry)
                firstTry++
            }else if(this.isSpare(firstTry)){
                score += this.scoreForSpare(firstTry)
                firstTry += 2
            }else{
                score += this.scoreForFrame(firstTry)
                firstTry += 2
            }            
        }
        return score
    }


    private scoreForStrike(firstTry: number) {
        return 10 + this.rolls[firstTry + 1] + this.rolls[firstTry + 2]
    }

    private isStrike(firstTry: number) {
        return this.rolls[firstTry] == 10
    }

    private scoreForFrame(firstTry: number) {
        return this.rolls[firstTry] + this.rolls[firstTry + 1]
    }

    private scoreForSpare(firstTry: number) {
        return 10 + this.rolls[firstTry + 2]
    }

    private isSpare(firstTry: number) {
        return this.rolls[firstTry] + this.rolls[firstTry + 1] == 10
    }
}