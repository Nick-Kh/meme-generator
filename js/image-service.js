'use strict'
// var gKeywords = { happy: 12, 'funny puk': 1 }
// var gImgs = [{ id: 1, url: '../img/1.jpg', keywords: ['happy'] }]

let gImgs = []
let gGallerySize = 18

const populateImgs = () => {
  for (let i = 1; i <= gGallerySize; i++) {
    gImgs.push(_createImage(i))
  }
}

const _createImage = (imgIdx) => ({
  id: imgIdx,
  imgUrl: `../img/${imgIdx}.jpg`,
  keywords: ['none'],
})

populateImgs()

const getImages = () => gImgs
const getImageById = (imgId) => gImgs.find((image) => image.id === imgId)
