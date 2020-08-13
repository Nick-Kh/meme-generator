'use strict'

let gMeme = {}

const memeInit = (imgId) => {
  gMeme = {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    lines: [],
    currentText: '',
    currentProps: {
      fillColor: 'white',
      strokeColor: 'white',
      // font: '40px Arial',
      fontSize: 40,
      font: 'Arial',
      textAlign: 'center',
    },
  }
}

const getCurrentMeme = () => gMeme

const addMemeText = (txt) => {
  gMeme.currentText = txt
}

const getFontSize = () => gMeme.currentProps.fontSize

const setFontSize = (fontSize) => {
  gMeme.currentProps.fontSize = fontSize
}
