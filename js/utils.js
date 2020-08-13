const toggleElementsToDisplay = (elToDisplay, elToRemove) => {
  const elShow = document.querySelector('.' + elToDisplay)
  const elHide = document.querySelector('.' + elToRemove)
  elShow.classList.remove('hidden')
  elHide.classList.add('hidden')
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
