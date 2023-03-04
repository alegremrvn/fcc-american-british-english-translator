'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (!(req.body.hasOwnProperty('locale') && req.body.hasOwnProperty('text'))) {
        res.json({
          error: 'Required field(s) missing'
        })
      } else {
        if (req.body.text === '') {
          res.json({
            error: 'No text to translate'
          })
        } else if (!(req.body.locale === 'american-to-british' || req.body.locale === 'british-to-american')) {
          res.json({
            error: 'Invalid value for locale field'
          })
        } else {
          if (translator.translate(req.body.text, req.body.locale) === req.body.text) {
            res.json({
              text: req.body.text,
              translation: 'Everything looks good to me!'
            })
          } else {
            res.json({
              text: req.body.text,
              translation: translator.translate(req.body.text, req.body.locale)
            })
          }
        }
      }
    });
};
