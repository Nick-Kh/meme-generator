const toggleElementsToDisplay = (elToDisplay, elToRemove) => {
  const elShow = document.querySelector('.' + elToDisplay)
  const elHide = document.querySelector('.' + elToRemove)
  elShow.classList.remove('hidden')
  elHide.classList.add('hidden')
}

// const onLineEdit = (elInputText) => {
//   console.log(elInputText.value)
// }
