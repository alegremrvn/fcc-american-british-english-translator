const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  test('Translation with text and locale fields', function(done) {
    const text = 'Mangoes are my favorite fruit.'
    const locale = 'american-to-british'
    const result = {
      text,
      translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
    }

    chai.request(server)
      .post('/api/translate')
      .send({
        text,
        locale
      })
      .end(function(err, res) {
        assert.isObject(res.body)
        assert.property(res.body, 'text')
        assert.property(res.body, 'translation')
        assert.deepEqual(res.body, result)

        done()
      })
  })
  
  test('Translation with text and invalid locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Foo.',
        locale: 'invalid value'
      })
      .end(function(err, res) {
        assert.equal(res.body.error, 'Invalid value for locale field')
  
        done()
      })
  })
  
  test('Translation with missing text field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british'
      })
      .end(function(err, res) {
        assert.equal(res.body.error, 'Required field(s) missing')
  
        done()
      })
  })
  
  test('Translation with missing locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Foo.'
      })
      .end(function(err, res) {
        assert.equal(res.body.error, 'Required field(s) missing')
  
        done()
      })
  })
  
  test('Translation with empty text', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: '',
        locale: 'american-to-british'
      })
      .end(function(err, res) {
        assert.equal(res.body.error, 'No text to translate')
  
        done()
      })
  })
  
  test('Translation with text that needs no translation', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'FCC is my favourite website to spend my time on.',
        locale: 'american-to-british'
      })
      .end(function(err, res) {
        assert.deepEqual(res.body, {
          text: 'FCC is my favourite website to spend my time on.',
          translation: 'Everything looks good to me!'
        })
  
        done()
      })
  })
  
});
