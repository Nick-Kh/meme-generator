'use strict'

let gCanvas
let gCtx
let gCurrMeme
let gCurrLine
let gSelected = false
let gMemeId = 1000
const STEP = 5

const onImageClick = (imgId, memeId = null) => {
  let elSearch = document.querySelector('.search-bar')
  let elBtns = document.querySelectorAll('li')
  for (let i = 0; i < elBtns.length; i++) {
    elBtns[i].classList.remove('selected')
  }
  elSearch.classList.add('hidden')
  toggleElementsToDisplay('meme-editor', 'gallery')
  if (!memeId) {
    memeInit(imgId)
  } else {
    let memes = getMemes()
    setCurrentMeme(memes.find((meme) => meme.memeId === memeId))
  }
  gCurrMeme = getCurrentMeme()
  clearInput()
  gCurrLine = gCurrMeme.selectedLineIdx
  renderCanvas(gCurrMeme)
}

const renderCanvas = (currMeme = gCurrMeme) => {
  const currImg = getImageById(currMeme.selectedImgId)
  const img = new Image()
  gCanvas = document.querySelector('#img-canvas')
  gCtx = gCanvas.getContext('2d')
  img.src = currImg.imgUrl
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderMemeText(currMeme)
    if (gSelected) renderSelectedArea()
  }
}

const onLineEdit = (elInputText) => {
  addMemeText(elInputText.value)
  renderCanvas(gCurrMeme)
}

const renderMemeText = (currMeme) => {
  var textSize
  for (var i = 0; i < currMeme.lines.length; i++) {
    let {
      fillColor,
      strokeColor,
      font,
      fontSize,
      textAlign,
      txt,
    } = currMeme.lines[i]

    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = textAlign
    if (txt === '' && i === gCurrLine && i !== 0) {
      txt = '_'
      gCtx.fillStyle = 'red'
    }
    var lines = getLines(gCtx, txt, gCanvas.width)
    var xPos = currMeme.lines[i].startPosX
    var yPos = currMeme.lines[i].startPosY
    for (var j = 0; j < lines.length; j++) {
      textSize = gCtx.measureText(lines[j])
      gCtx.fillText(lines[j], xPos, yPos)
      gCtx.strokeText(lines[j], xPos, yPos)
      yPos += 50
    }
    gCurrMeme.lines[i].width = lines.length > 1 ? gCanvas.width : textSize.width
    gCurrMeme.lines[i].linesCount = lines.length
    gCurrMeme.lines[i].height = textSize.actualBoundingBoxAscent
  }
}

const onFontIncrease = () => {
  let fontSize = getFontSize()
  if (fontSize > 50) return
  fontSize += 2
  setFontSize(fontSize)
  renderCanvas(gCurrMeme)
}

const onFontDecrease = () => {
  let fontSize = getFontSize()
  if (fontSize < 30) return
  fontSize -= 2
  setFontSize(fontSize)
  renderCanvas(gCurrMeme)
}

const onAlignText = (value) => {
  setTextAlignment(value)
  renderCanvas(gCurrMeme)
}

const onColorChange = (elColorPicker) => {
  const newColor = elColorPicker.value
  setTextColor(newColor)
  renderCanvas(gCurrMeme)
}

const onFontChange = (elFontSelector) => {
  const newFont = elFontSelector.value
  setTextFont(newFont)
  renderCanvas(gCurrMeme)
}

const onSelectNextLine = () => {
  gSelected = true
  gCurrLine++
  if (gCurrMeme.lines.length <= gCurrLine) {
    gCurrLine = 0
  }
  setCurrLineIdx(gCurrLine)
  setCurrentInput()
  renderCanvas(gCurrMeme)
}

const onAddLine = () => {
  addNewTextLine()
  gCurrLine++
  if (gCurrLine > 2) {
    gCurrLine = 0
    setCurrLineIdx(gCurrLine)
  }
  setCurrLineIdx(gCurrLine)
  clearInput()
  renderCanvas(gCurrMeme)
}

const renderSelectedArea = () => {
  const { width, startPosX, startPosY, linesCount, height } = gCurrMeme.lines[
    gCurrLine
  ]

  gCtx.beginPath()
  var startX = startPosX - width / 2
  var endX = width
  var startY = startPosY - height
  var endY = linesCount * height * 1.3
  gCtx.rect(startX, startY, endX, endY)
  gCtx.strokeStyle = 'red'
  gCtx.stroke()
  gSelected = false
}

const clearInput = () => {
  let elInputText = document.querySelector('#text-input')
  elInputText.value = ''
}

const setCurrentInput = () => {
  let elInputText = document.querySelector('#text-input')
  elInputText.value = gCurrMeme.lines[gCurrLine].txt
}

const onRemoveSelectedLine = () => {
  removeLine(gCurrLine)
  clearInput()
  onSelectNextLine()
}

const onMoveUp = () => {
  const { startPosY, height } = gCurrMeme.lines[gCurrLine]
  let currY = startPosY
  if (currY - height - STEP < 0) return
  currY -= STEP
  setYPosition(currY)
  renderCanvas(gCurrMeme)
}

const onMoveDown = () => {
  const { startPosY } = gCurrMeme.lines[gCurrLine]
  let currY = startPosY
  if (currY + STEP > gCanvas.height) return
  currY += STEP
  setYPosition(currY)
  renderCanvas(gCurrMeme)
}

const onMoveLeft = () => {
  let { startPosX, width, textAlign } = gCurrMeme.lines[gCurrLine]
  if (textAlign === 'center') width = width / 2
  let currX = startPosX
  if (currX - STEP - width < 0) return
  currX -= STEP
  setXPosition(currX)
  renderCanvas(gCurrMeme)
}

const onMoveRight = () => {
  let { startPosX, width, textAlign } = gCurrMeme.lines[gCurrLine]
  if (textAlign === 'center') width = width / 2
  let currX = startPosX
  if (currX + STEP + width > gCanvas.width) return
  currX += STEP
  setXPosition(currX)
  renderCanvas(gCurrMeme)
}

const onDownloadMeme = () => {
  gCanvas.toDataURL('image/jpg')
  let imageData = gCanvas.toDataURL('jpg')
  let link = document.createElement('a')
  link.href = imageData
  link.download = 'my-meme.jpg'
  link.click()
}

const onSaveMeme = () => {
  let imageData = gCanvas.toDataURL()
  let memeId = gMemeId++
  let memeData = { imageData, memeId, ...gCurrMeme }
  addNewMeme(memeData)
}

const onShareMeme = () => {}
