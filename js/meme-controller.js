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
  gCtx.fillText(currMeme.currentText, 200, 50)
  gCtx.strokeText(currMeme.currentText, 200, 50)
}

const onFontIncrease = () => {
  let fontSize = getFontSize()
  fontSize += 2
  setFontSize(fontSize)
  renderCanvas(currMeme)
}

const onFontDecrease = () => {
  let fontSize = getFontSize()
  fontSize -= 2
  setFontSize(fontSize)
  renderCanvas(currMeme)
}
