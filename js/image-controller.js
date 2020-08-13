'use strict'

const onInitGallery = (elGalleryBtn) => {
  toggleElementsToDisplay('gallery', 'meme-editor')
  elGalleryBtn.classList.add('selected')

  renderGallery()
}

const renderGallery = () => {
  let images = getImages()
  let strHTML = images.map(
    (img) =>
      `<div> <img class="meme-img"  onclick="onImageClick(${img.id})" src="img/${img.id}.jpg"/> </div>`
  )
  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTML.join('')
}
