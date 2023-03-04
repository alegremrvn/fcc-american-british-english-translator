const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const keysOfAmericanOnly = Object.keys(americanOnly)
const keysOfSpelling = Object.keys(americanToBritishSpelling)
const keysOfTitles = Object.keys(americanToBritishTitles)
const keysOfBritishOnly = Object.keys(britishOnly)
const valuesOfSpelling = Object.values(americanToBritishSpelling)
const valuesOfTitles = Object.values(americanToBritishTitles)

const americanSearchSpace = [keysOfAmericanOnly, keysOfSpelling, keysOfTitles]
const britishSearchSpace = [keysOfBritishOnly, valuesOfSpelling, valuesOfTitles]

const findKeyByValue = (obj, val) => {
  for (let key in obj) {
    if (obj[key] === val) {
      return key;
    }
  }
};

class Match {
  constructor(index, lenOfString, orig, replacement) {
    this.index = index
    this.lenOfString = lenOfString
    this.orig = orig
    this.replacement = replacement
  }
}

class Translator {
  constructor() {
    this.translate = function (text, locale) {
      let timeSymbol
      const matches = []

      if (locale === 'american-to-british') {
        timeSymbol = ':'

        for (let i = 0; i < americanSearchSpace.length; i++) {
          for (let string of americanSearchSpace[i]) {
            let index = text.indexOf(string)
            if (index !== -1) {
              let replacement
              if (i === 0) {
                replacement = americanOnly[string]
              } else if (i === 1) {
                replacement = americanToBritishSpelling[string]
              } else if (i === 2) {
                replacement = americanToBritishTitles[string]
                replacement = replacement.slice(0, 1).toUpperCase() + replacement.slice(1, replacement.length)
              }

              matches.push(new Match(index, string.length, string, replacement))
            } else {
              let textLC = text.toLowerCase()

              let index = textLC.indexOf(string)
              if (index !== -1) {
                let replacement
                if (i === 0) {
                  replacement = americanOnly[string]
                } else if (i === 1) {
                  replacement = americanToBritishSpelling[string]
                } else if (i === 2) {
                  replacement = americanToBritishTitles[string]
                  replacement = replacement.slice(0, 1).toUpperCase() + replacement.slice(1, replacement.length)
                }

                matches.push(new Match(index, string.length, string, replacement))
              }
            }
          }
        }
      } else if (locale === 'british-to-american') {
        timeSymbol = '.'

        for (let i = 0; i < britishSearchSpace.length; i++) {
          for (let string of britishSearchSpace[i]) {
            let index = text.indexOf(string)
            if (index !== -1) {
              let replacement
              if (i === 0) {
                replacement = britishOnly[string]
              } else if (i === 1) {
                replacement = findKeyByValue(americanToBritishSpelling, string)
              } else if (i === 2) {
                replacement = findKeyByValue(americanToBritishTitles, string)
                replacement = replacement.slice(0, 1).toUpperCase() + replacement.slice(1, replacement.length)
              }

              matches.push(new Match(index, string.length, string, replacement))
            } else {
              let textLC = text.toLowerCase()

              let index = textLC.indexOf(string)
              if (index !== -1) {
                let replacement
                if (i === 0) {
                  replacement = britishOnly[string]
                } else if (i === 1) {
                  replacement = findKeyByValue(americanToBritishSpelling, string)
                } else if (i === 2) {
                  replacement = findKeyByValue(americanToBritishTitles, string)
                  replacement = replacement.slice(0, 1).toUpperCase() + replacement.slice(1, replacement.length)
                }

                matches.push(new Match(index, string.length, string, replacement))
              }
            }
          }
        }
      }

      try {
        let regex
        let replacement
        let captureGroup

        if (locale === 'american-to-british') {
          regex = /\s?[1-2]\d:[0-5]\d[ ?.!,]|\s?[1-9]:[0-5]\d[ ?.!,]/
          captureGroup = /(:)/
          replacement = '.'
        } else {
          regex = /\s?[1-2]\d\.[0-5]\d[ ?.!,]|\s?[1-9]\.[0-5]\d[ ?.!,]/
          captureGroup = /(\.)/
          replacement = ':'
        }

        let result = text.match(regex)
        if (result.length === 1) {
          let output = result[0]
          output = output.replace(captureGroup, replacement)

          matches.push(new Match(result.index + 1, result[0].length - 2, result[0].slice(1, result[0].length - 1), output.slice(1, output.length - 1)))
        }
      } catch {
        // do nothing
      }

      // massage the matches array
      for (let i = matches.length - 2; i >= 0; i--) {
        if (matches[i].index == matches[i + 1].index &&
          matches[i].lenOfString < matches[i + 1].lenOfString) {
          matches.splice(i, 1)
        } else if (matches[i].index == matches[i + 1].index &&
          matches[i].lenOfString > matches[i + 1].lenOfString) {
          matches.splice(i + 1, 1)
        }
      }
      matches.sort((a, b) => a.index - b.index)
      let dropList = []
      for (let i = 0; i < matches.length - 1; i++) {
        for (let j = i + 1; j < matches.length; j++) {
          if (matches[i].index + matches[i].lenOfString >= matches[j].index + matches[j].lenOfString) {
            dropList.push(j)
          }
        }
      }
      dropList.sort((a, b) => b - a)
      for (let i of dropList) {
        matches.splice(i, 1)
      }

      const highlightPrefix = `<span class="highlight">`
      const highlightSuffix = `</span>`
      for (let i = matches.length - 1; i >= 0; i--) {
        text = text.slice(0, matches[i].index) +
          highlightPrefix +
          matches[i].replacement +
          highlightSuffix +
          text.slice(matches[i].index + matches[i].lenOfString, text.length)
      }
      return text
    }
  }
}

module.exports = Translator;