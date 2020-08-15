'use strict'

let gImgs = []
let gGallerySize = 18
let gFilter = null
let gKeyWordMap = {}
let gKeyWords = [
  'All',
  'Movies',
  'Cartoons',
  'Animals',
  'Politics',
  'Children',
  'Sports',
  'Science',
]

const createImgs = () => {
  for (let i = 1; i <= gGallerySize; i++) {
    gImgs.push(_createImage(i))
  }
  _groupKeyWords()
  _createKeyWordMap()
}

const _createImage = (imgIdx) => ({
  id: imgIdx,
  imgUrl: `img/${imgIdx}.jpg`,
  keywords: [],
})

const _groupKeyWords = () => {
  const movies = [8, 13, 14, 15, 16]
  _setKeywords(movies, gKeyWords[1])
  const cartoons = [18]
  _setKeywords(cartoons, gKeyWords[2])
  const animals = [2, 3, 4]
  _setKeywords(animals, gKeyWords[3])
  const politics = [1, 10, 17]
  _setKeywords(politics, gKeyWords[4])
  const children = [3, 5, 7, 9]
  _setKeywords(children, gKeyWords[5])
  const sports = [11]
  _setKeywords(sports, gKeyWords[6])
  const science = [6, 12]
  _setKeywords(science, gKeyWords[7])
}

const _setKeywords = (imgs, keyword) => {
  for (var i = 0; i < imgs.length; i++) {
    gImgs[imgs[i] - 1].keywords.push(keyword)
  }
}

const _createKeyWordMap = () => {
  for (let i = 0; i < gKeyWords.length; i++) {
    gKeyWordMap[gKeyWords[i].toLowerCase()] = 16
  }
}

const getImages = () => {
  if (!gFilter) return gImgs
  var newImgs = gImgs.filter((img) => {
    for (let i = 0; i < img.keywords.length; i++) {
      if (img.keywords[i].toLowerCase().includes(gFilter.toLowerCase()))
        return true
    }
    return false
  })
  return newImgs
}

const setFilter = (searchTerm) => {
  if (searchTerm === '' || searchTerm === 'all') gFilter = null
  else gFilter = searchTerm
}

const updateKeyWordMap = (key, value) => {
  gKeyWordMap[key] = value
}

const setGalleryToDisplay = (value) => {
  gDisplay = value
}

const getImageById = (imgId) => gImgs.find((image) => image.id === imgId)

const getKeyWords = () => gKeyWords

const getKeyWordMap = () => gKeyWordMap

createImgs()
