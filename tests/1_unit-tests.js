const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()

suite('Unit Tests', () => {
  suite('Translate to British English', function () {
    test(`Mangoes are my favorite fruit.`, function () {
      assert.equal(translator.translate(`Mangoes are my favorite fruit.`, 'american-to-british'), `Mangoes are my <span class="highlight">favourite</span> fruit.`)
    })
    
    test(`I ate yogurt for breakfast.`, function () {
      assert.equal(translator.translate(`I ate yogurt for breakfast.`, 'american-to-british'), `I ate <span class="highlight">yoghurt</span> for breakfast.`)
    })
    
    test(`We had a party at my friend's condo.`, function () {
      assert.equal(translator.translate(`We had a party at my friend's condo.`, 'american-to-british'), `We had a party at my friend's <span class="highlight">flat</span>.`)
    })
    
    test(`Can you toss this in the trashcan for me?`, function () {
      assert.equal(translator.translate(`Can you toss this in the trashcan for me?`, 'american-to-british'), `Can you toss this in the <span class="highlight">bin</span> for me?`)
    })
    
    test(`The parking lot was full.`, function () {
      assert.equal(translator.translate(`The parking lot was full.`, 'american-to-british'), `The <span class="highlight">car park</span> was full.`)
    })
    
    test(`Like a high tech Rube Goldberg machine.`, function () {
      assert.equal(translator.translate(`Like a high tech Rube Goldberg machine.`, 'american-to-british'), `Like a high tech <span class="highlight">Heath Robinson device</span>.`)
    })
    
    test(`To play hooky means to skip class or work.`, function () {
      assert.equal(translator.translate(`To play hooky means to skip class or work.`, 'american-to-british'), `To <span class="highlight">bunk off</span> means to skip class or work.`)
    })
    
    test(`No Mr. Bond, I expect you to die.`, function () {
      assert.equal(translator.translate(`No Mr. Bond, I expect you to die.`, 'american-to-british'), `No <span class="highlight">Mr</span> Bond, I expect you to die.`)
    })
    
    test(`Dr. Grosh will see you now.`, function () {
      assert.equal(translator.translate(`Dr. Grosh will see you now.`, 'american-to-british'), `<span class="highlight">Dr</span> Grosh will see you now.`)
    })
    
    test(`Lunch is at 12:15 today.`, function () {
      assert.equal(translator.translate(`Lunch is at 12:15 today.`, 'american-to-british'), `Lunch is at <span class="highlight">12.15</span> today.`)
    })
    
  })

  suite('Translate to American English', function () {
    test(`We watched the footie match for a while.`, function () {
      assert.equal(translator.translate(`We watched the footie match for a while.`, 'british-to-american'), `We watched the <span class="highlight">soccer</span> match for a while.`)
    })
    
    test(`Paracetamol takes up to an hour to work.`, function () {
      assert.equal(translator.translate(`Paracetamol takes up to an hour to work.`, 'british-to-american'), `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
    })
    
    test(`First, caramelise the onions.`, function () {
      assert.equal(translator.translate(`First, caramelise the onions.`, 'british-to-american'), `First, <span class="highlight">caramelize</span> the onions.`)
    })
    
    test(`I spent the bank holiday at the funfair.`, function () {
      assert.equal(translator.translate(`I spent the bank holiday at the funfair.`, 'british-to-american'), `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`)
    })
    
    test(`I had a bicky then went to the chippy.`, function () {
      assert.equal(translator.translate(`I had a bicky then went to the chippy.`, 'british-to-american'), `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`)
    })
    
    test(`I've just got bits and bobs in my bum bag.`, function () {
      assert.equal(translator.translate(`I've just got bits and bobs in my bum bag.`, 'british-to-american'), `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`)
    })
    
    test(`The car boot sale at Boxted Airfield was called off.`, function () {
      assert.equal(translator.translate(`The car boot sale at Boxted Airfield was called off.`, 'british-to-american'), `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`)
    })
    
    test(`Have you met Mrs Kalyani?`, function () {
      assert.equal(translator.translate(`Have you met Mrs Kalyani?`, 'british-to-american'), `Have you met <span class="highlight">Mrs.</span> Kalyani?`)
    })
    
    test(`Prof Joyner of King's College, London.`, function () {
      assert.equal(translator.translate(`Prof Joyner of King's College, London.`, 'british-to-american'), `<span class="highlight">Prof.</span> Joyner of King's College, London.`)
    })
    
    test(`Tea time is usually around 4 or 4.30.`, function () {
      assert.equal(translator.translate(`Tea time is usually around 4 or 4.30.`, 'british-to-american'), `Tea time is usually around 4 or <span class="highlight">4:30</span>.`)
    })
    
  })

  suite('Translation Highlighting', function () {
    test(`Mangoes are my favorite fruit.`, function () {
      assert.equal(translator.translate(`Mangoes are my favorite fruit.`, 'american-to-british'), `Mangoes are my <span class="highlight">favourite</span> fruit.`)
    })
    
    test(`I ate yogurt for breakfast.`, function () {
      assert.equal(translator.translate(`I ate yogurt for breakfast.`, 'american-to-british'), `I ate <span class="highlight">yoghurt</span> for breakfast.`)
    })
    
    test(`We watched the footie match for a while.`, function () {
      assert.equal(translator.translate(`We watched the footie match for a while.`, 'british-to-american'), `We watched the <span class="highlight">soccer</span> match for a while.`)
    })
    
    test(`Paracetamol takes up to an hour to work.`, function () {
      assert.equal(translator.translate(`Paracetamol takes up to an hour to work.`, 'british-to-american'), `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
    })
    
  })
});
