(function (window, document) {
  var layout = document.getElementById('layout')
  var menu = document.getElementById('menu')
  var menuLink = document.getElementById('menuLink')

  function toggleClass (element, newClass) {
    var classes = Array.from((element.className).split(/\s+/))
    var length = classes.length
    console.log(classes)

    function checkStatus (item, index) {
      if (item === newClass) {
        classes.splice(index, 1)
      }
    } // end of func checkStatus

    classes.forEach(checkStatus)

    if (length === classes.length) {
      classes.push(newClass)
    }

    element.className = classes.join(' ')
  }
  menuLink.onclick = function (e) {
    var active = 'active'

    e.preventDefault()
    toggleClass(layout, active)
    toggleClass(menu, active)
    toggleClass(menuLink, active)
  }
}(this, this.document))
