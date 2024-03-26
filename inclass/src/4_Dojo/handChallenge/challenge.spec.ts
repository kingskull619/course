import { Emoji } from './challenge';

describe('', () => {
  const HELLO_SEQUENCE = "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊";
  const HELLO_WORLD_SEQUENCE = "👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊";

  let emoji: Emoji;

  it("👉 should move the memory pointer to the next cell", () => {
    initializeEmoji([0, 65]);

    emoji.read("👉👊");

    expect(emoji.print()).toBe("A");
  })

  it("👈 should move the memory pointer to the previous cell", () => {
    initializeEmoji([65, 0], 1);

    emoji.read("👈👊")

    expect(emoji.print()).toBe("A");
  })

  it("👆 Should increment memory cell to 255 and then decrease it to 0", () => {
    initializeEmoji([255]);

    emoji.read("👆👊")

    expect(emoji.print()).toBe("\u0000")
  })

  it("👆 should increment the memory cell at the current position", () => {
    initializeEmoji([64]);

    emoji.read("👆👊")

    expect(emoji.print()).toBe("A")
  })


  it("👉👆 should move the memory pointer to the next cell and increment the actual cell", () => {
    initializeEmoji([0, 64]);

    emoji.read("👉👆👊")
    expect(emoji.print()).toBe("A")
  })

  it("👇 should decrease the memory cell at the current position.", () => {
    initializeEmoji([66]);

    emoji.read("👇👊")
    expect(emoji.print()).toBe("A")
  })

  it("👇 should set 255 if value is 0", () => {
    initializeEmoji();

    emoji.read("👇👊")

    expect(emoji.print()).toBe("ÿ")
  })

  it("🤜 should jump to the corresponding 🤛 if pointed memory cell has value 0",() => {
    initializeEmoji([0,77]);

    emoji.read("🤜👇👇🤛👉👆👊")

    expect(emoji.print()).toBe("N")
  })

  it("🤜 should not jump to the corresponding 🤛 if pointed memory cell does not have value 0", () => {
    initializeEmoji([84])

    emoji.read("🤜👇👇👉👆👈🤛👉👊")

    expect(emoji.print()).toBe("*")
  })
  
  it("🤛 should jump to the corresponding previous 🤜 if pointed memory cell does not have value 0", () => {
    initializeEmoji([80])

    emoji.read("🤜👇👇👉👆👈🤛👉👊")

    expect(emoji.print()).toBe("(")
  })

  it("🤜🤛 must have the capability of being nested in other 🤜🤛",()=>{
    initializeEmoji([50]);

    emoji.read("👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛🤛👈👊");
    
    expect(emoji.print()).toBe("3");
  });

  it("Should print 'Hello'", ()=>{
    initializeEmoji();

    emoji.read(HELLO_SEQUENCE);

    expect(emoji.print()).toBe("Hello")

  })
  
  it("Should print 'Hello World!\\n'", ()=>{
    initializeEmoji();

    emoji.read(HELLO_WORLD_SEQUENCE);
    
    expect(emoji.print()).toBe("Hello World!\n");

  })

  function initializeEmoji(memory: number[] = [0], pointer: number = 0){
    emoji = new Emoji(memory, pointer);
  }
    
});
