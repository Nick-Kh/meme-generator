const toggleElementsToDisplay = (elToDisplay, elToRemove) => {
  document.querySelector('.' + elToDisplay).classList.remove('hidden')
  document.querySelector('.' + elToRemove).classList.add('hidden')
}

const toggleMenuButtons = (btnToSelect, btnToUnselect) => {
  var newBtn = document.querySelector('.' + btnToSelect)
  var prevBtn = document.querySelector('.' + btnToUnselect)
  newBtn.classList.add('selected')
  prevBtn.classList.remove('selected')
  return newBtn.innerText
}

function getLines(gCtx, text, maxWidth) {
  var words = text.split(' ')
  var lines = []
  var currentLine = words[0]

  for (var i = 1; i < words.length; i++) {
    var word = words[i]
    var width = gCtx.measureText(currentLine + ' ' + word).width
    if (width < maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}
