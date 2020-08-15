'use strict'

let gMemes
let gMemeFilter = null

const loadMemesFromStorage = () => {
  gMemes = JSON.parse(localStorage.getItem('memes'))
    ? JSON.parse(localStorage.getItem('memes'))
    : []
}

const getMemes = () => {
  if (!gMemeFilter) return gMemes
  var newMemes = gMemes.filter((meme) => {
    for (let i = 0; i < meme.keywords.length; i++) {
      if (meme.keywords[i].toLowerCase().includes(gMemeFilter.toLowerCase()))
        return true
    }
    return false
  })
  return newMemes
}

const setMemeFilter = (searchTerm) => {
  if (searchTerm === '' || searchTerm === 'all') gMemeFilter = null
  else gMemeFilter = searchTerm
}

const _saveMemesToStorage = () => {
  localStorage.setItem('memes', JSON.stringify(gMemes))
}

const addNewMeme = (newMeme) => {
  gMemes.push(newMeme)
  _saveMemesToStorage()
}
