'use strict'

let gMeme = {}
const DEFAULT_POSITIONS = {
  xPosCenter: 200,
  xPosLeft: 20,
  xPosRight: 370,
  yPosTop: 50,
  yPosCenter: 200,
  yPosBottom: 350,
}

const memeInit = (imgId) => {
  gMeme = {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    lines: [],
    currentText: '',
    currentProps: {
      posX: 200,
      posY: 50,
      fillColor: 'white',
      strokeColor: 'black',
      fontSize: 40,
      font: 'Impact',
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

const setTextAlignment = (alignment) => {
  gMeme.currentProps.textAlign = alignment
  switch (alignment) {
    case 'center':
      setXPosition(DEFAULT_POSITIONS.xPosCenter)
      break
    case 'left':
      setXPosition(DEFAULT_POSITIONS.xPosLeft)
      break
    case 'right':
      setXPosition(DEFAULT_POSITIONS.xPosRight)
      break
    default:
      break
  }
}

const setXPosition = (newX) => {
  gMeme.currentProps.posX = newX
}

const setYPosition = (newY) => {
  gMeme.currentProps.posY = newY
}

const setTextColor = (newColor) => {
  gMeme.currentProps.fillColor = newColor
}

const setTextFont = (newFont) => {
  console.log(newFont)
  gMeme.currentProps.font = newFont
}
