'use strict'

let gCanvas
let gCtx
let currMeme

const onImageClick = (imgId) => {
  toggleElementsToDisplay('meme-editor', 'gallery')
  memeInit(imgId)
  currMeme = getCurrentMeme()
  renderCanvas(currMeme)
}

const renderCanvas = (currMeme) => {
  const currImg = getImageById(currMeme.selectedImgId)
  const img = new Image()
  gCanvas = document.querySelector('#img-canvas')
  gCtx = gCanvas.getContext('2d')
  img.src = currImg.imgUrl
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  renderMemeText(currMeme)
}

const onLineEdit = (elInputText) => {
  addMemeText(elInputText.value)
  renderCanvas(currMeme)
}

const renderMemeText = (currMeme) => {
  const {
    fillColor,
    strokeColor,
    font,
    fontSize,
    textAlign,
  } = currMeme.currentProps
  gCtx.fillStyle = fillColor
  gCtx.strokeStyle = strokeColor
  gCtx.font = `${fontSize}px ${font}`
  gCtx.textAlign = textAlign
  let lines = getLines(gCtx, currMeme.currentText, 400)
  let xPos = currMeme.currentProps.posX
  let yPos = currMeme.currentProps.posY
  console.log('Y: ' + yPos + '  X: ' + xPos)
  for (let i = 0; i < lines.length; i++) {
    gCtx.fillText(lines[i], xPos, yPos)
    gCtx.strokeText(lines[i], xPos, yPos)
    yPos += 50
  }
}

const onFontIncrease = () => {
  let fontSize = getFontSize()
  if (fontSize > 50) return
  fontSize += 2
  setFontSize(fontSize)
  renderCanvas(currMeme)
}

const onFontDecrease = () => {
  let fontSize = getFontSize()
  if (fontSize < 30) return
  fontSize -= 2
  setFontSize(fontSize)
  renderCanvas(currMeme)
}

const onAlignText = (value) => {
  setTextAlignment(value)
  renderCanvas(currMeme)
}
