'use strict'

let gMemes

const loadMemesFromStorage = () => {
  gMemes = JSON.parse(localStorage.getItem('memes'))
    ? JSON.parse(localStorage.getItem('memes'))
    : []
}

const getMemes = () => gMemes

const _saveMemesToStorage = () => {
  localStorage.setItem('memes', JSON.stringify(gMemes))
}

const addNewMeme = (newMeme) => {
  gMemes.push(newMeme)
  _saveMemesToStorage()
}
