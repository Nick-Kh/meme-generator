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

const DEFAULT_PROPS = {
  txt: '',
  width: 0,
  height: 0,
  linesCount: 0,
  startPosX: 200,
  startPosY: 50,
  fillColor: 'white',
  strokeColor: 'black',
  fontSize: 40,
  font: 'Impact',
  textAlign: 'center',
}

const memeInit = (imgId) => {
  gMeme = {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    lines: [{ ...DEFAULT_PROPS }],
  }
}

const getCurrentMeme = () => gMeme

const setCurrentMeme = (meme) => {
  gMeme = meme
}

const addMemeText = (txt) => {
  if (txt === '_') txt = ''
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

const getFontSize = () => gMeme.lines[gMeme.selectedLineIdx].fontSize

const setFontSize = (fontSize) => {
  gMeme.lines[gMeme.selectedLineIdx].fontSize = fontSize
}

const setTextAlignment = (alignment) => {
  gMeme.lines[gMeme.selectedLineIdx].textAlign = alignment
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
  gMeme.lines[gMeme.selectedLineIdx].startPosX = newX
}

const setYPosition = (newY) => {
  gMeme.lines[gMeme.selectedLineIdx].startPosY = newY
}

const setTextColor = (newColor) => {
  gMeme.lines[gMeme.selectedLineIdx].fillColor = newColor
}

const setTextFont = (newFont) => {
  gMeme.lines[gMeme.selectedLineIdx].font = newFont
}

const setEndTextPositions = (xPos, yPos) => {
  gMeme.lines[gMeme.selectedLineIdx].endPosX = xPos
  gMeme.lines[gMeme.selectedLineIdx].endPosY = yPos
}

const addNewTextLine = () => {
  gMeme.selectedLineIdx++
  gMeme.lines[gMeme.selectedLineIdx] = { ...DEFAULT_PROPS }
  if (gMeme.selectedLineIdx === 1) setYPosition(DEFAULT_POSITIONS.yPosBottom)
  if (gMeme.selectedLineIdx === 2) setYPosition(DEFAULT_POSITIONS.yPosCenter)
}

const setCurrLineIdx = (idx) => {
  gMeme.selectedLineIdx = idx
}

const removeLine = (idx) => {
  gMeme.lines[idx] = { ...DEFAULT_PROPS }
}
