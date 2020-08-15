'use strict'

const MAX_FONTSIZE = 24

const onInitGallery = (elBtn = null) => {
  let elSearch = document.querySelector('.search-bar')
  let showPage = ''
  setFilter('')
  if (elBtn) {
    if (elBtn.classList.contains('saved-memes-btn')) {
      showPage = toggleMenuButtons('saved-memes-btn', 'gallery-btn')
      elSearch.classList.add('hidden')
    } else {
      showPage = toggleMenuButtons('gallery-btn', 'saved-memes-btn')
      elSearch.classList.remove('hidden')
    }
  }
  toggleElementsToDisplay('gallery', 'meme-editor')
  renderKeyWords()
  renderGallery(showPage)
}

const renderGallery = (showPage) => {
  const elGallery = document.querySelector('.gallery')
  loadMemesFromStorage()
  if (showPage === '' || showPage === 'Gallery') {
    let images = getImages()
    let strHTML = images.map(
      (img) =>
        `<div> <img class="meme-img" onclick="onImageClick(${img.id})" src="img/${img.id}.jpg"/> </div>`
    )
    elGallery.innerHTML = strHTML.join('')
  } else {
    const memes = getMemes()
    let strHTML = memes.map(
      (meme) =>
        `<div> <img class="meme-img" onclick="onImageClick(${meme.selectedImgId}, ${meme.memeId})" src="${meme.imageData}" /> </div>`
    )
    elGallery.innerHTML = strHTML.join('')
  }
}

const renderKeyWords = () => {
  const keywords = getKeyWords()
  const keywordMap = getKeyWordMap()
  let strHTML = keywords.map(
    (key) =>
      `<span class="keyword" id="${key.toLowerCase()}" style="font-size: ${
        keywordMap[key.toLowerCase()]
      }px" onclick="onKeyWordFilter(this)">${key}</span>`
  )
  let elKeywords = document.querySelector('.keywords')
  elKeywords.innerHTML = strHTML.join('')
}

const onSearchInput = (elSearchInput) => {
  setFilter(elSearchInput)
  renderGallery('Gallery')
}

const onKeyWordFilter = (elKeyword) => {
  let keyWordMap = getKeyWordMap()
  let keywordSize = keyWordMap[elKeyword.id]
  if (keywordSize + 2 <= MAX_FONTSIZE) {
    keywordSize += 2
    updateKeyWordMap(elKeyword.id, keywordSize)
  }
  elKeyword.style.fontSize = keywordSize + 'px'
  setFilter(elKeyword.id)
  renderGallery('Gallery')
}
