/**
 * Your task is to write a new esoteric programming language called "👊👆👉👇👈👊" (or "Befunge-93").
 * The interpreter will have to execute the code and store a buffer of memory cells, each initially set to 0 (representing a byte).
 * 
 * Your language will have only 8 commands:
 * 👉 > : moves the memory pointer to the next cell
 * 👈 <: moves the memory pointer to the previous cell
 * 👆 ^: increment the memory cell at the current position
 * 👇 v: decreases the memory cell at the current position.
 * 🤜 (: if the memory cell at the current position is 0, jump just after the corresponding 🤛
 * 🤛 ): if the memory cell at the current position is not 0, jump just to the corresponding (jump backwards) 🤜
 * 👊 s: Store in buffer the current character represented by the ASCII code defined by the current position.
 * Also exists a method print that return the string of what is in buffer
 * 
 * As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
 * Loops of 🤜 and 🤛 can be nested.
 * 
 * Tests:
 * Test 1 should print Hello!
 * 👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊
 * 
 * Test 2 should print Hello Wolrd\n
 * 👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊 👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊
 */

export class Emoji {
  private readonly TOP_VALUE: number = 255
  private readonly BOT_VALUE:number = 0
  private startOfNestingIndexesStack: number[] = [];
  private skipNestsCounter: number = 0;
  private buffer: string = ""

  constructor(
    private memory: number[] = [0],
    private pointer: number = 0
  ) { }

  private strategies = {
    "👈": () => this.moveMemoryToPreviousPointer(),
    "👉": () => this.moveMemoryToNextPointer(),
    "👆": () => this.increaseMemoryCell(),
    "👇": () => this.decreaseMemoryCell(),
    "👊": () => this.saveInBuffer(),
  }

  public read(emojis: string) {
    
    [...emojis].forEach((emoji, emojiIndex)=>{
      
      if(emoji === "🤜" ){
        this.evaluateNestingEmoji(emojiIndex);
        return;
      }

      if(emoji === "🤛"){
        this.evaluateJumpEmoji(emojiIndex, emojis);
        return;
      }

      if(this.notSkippingEmojis()) {        
        this.strategies[emoji]();
      }
    })
  }

  private moveMemoryToPreviousPointer() {
    this.pointer--;
  }

  private moveMemoryToNextPointer() {
    this.pointer++;
    if (this.pointer == this.memory.length) {
      this.memory.push(0)
    }
  }

  private increaseMemoryCell() {
    if (this.memory[this.pointer] === this.TOP_VALUE) {
      this.memory[this.pointer] = this.BOT_VALUE;
      return
    }
    this.memory[this.pointer]++;
  }

  private decreaseMemoryCell() {
    if (this.memory[this.pointer] === this.BOT_VALUE) {
      this.memory[this.pointer] = this.TOP_VALUE;
      return
    }

    this.memory[this.pointer]--;
  }

  private evaluateNestingEmoji(emojiIndex: number){
    if(this.skippingEmojis() || this.currentPointedValueIs0()){
      this.skipNestsCounter++;
    }

    this.startOfNestingIndexesStack.push(emojiIndex)
  }

  private evaluateJumpEmoji(jumpEmojiIndex: number, emojis: string){
    const emojiSequenceStartIndex = this.getEmojiSequenceStartIndex();
   
    if(this.notSkippingEmojis()){
      const emojiSequenceInNesting = this.getEmojiSequence(emojiSequenceStartIndex, jumpEmojiIndex, emojis)
      this.executeEmojiSequenceInNestingWhilePointedMemoryCellIs0(emojiSequenceInNesting);
    }else {
      this.skipNestsCounter--;
    }
  }

  private getEmojiSequence(emojiSequenceStartIndex: number, emojiSequenceEndIndex: number, emojis: string) {
    return [...emojis].slice(emojiSequenceStartIndex, emojiSequenceEndIndex).toString().replace(/,/g,"");
  }

  private getEmojiSequenceStartIndex() {
    return this.startOfNestingIndexesStack.pop() + 1;
  }

  private executeEmojiSequenceInNestingWhilePointedMemoryCellIs0(emojiSequenceInNesting: string) {            
    while (!this.currentPointedValueIs0()) {
      this.read(emojiSequenceInNesting)
    }
  }

  private saveInBuffer() {
    
    const value = this.memory[this.pointer]
    
    let valueInChar = String.fromCharCode(value)
    
    
    this.buffer += valueInChar;
  }

  private currentPointedValueIs0(): boolean{
    return this.memory[this.pointer] === 0;
  }

  private skippingEmojis(): boolean{
    return this.skipNestsCounter !== 0;
  }

  private notSkippingEmojis(): boolean{
    return this.skipNestsCounter === 0
  }

  public print() {
    return this.buffer
  }

}