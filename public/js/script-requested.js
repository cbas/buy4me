// Script ready to be integrated into main JS

function getRequestedArticles () {
  window.fetch('/items/requested', {
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
    },
    method: 'GET',
    cache: false
  }).then(function (response) {
    return response.json().then(function (json) {
      const articles = document.getElementById('data-yourorders')
      json.forEach(item => {
        const newObject = document.createElement('object')
        newObject.className = 'p-noline'

        for (var property in item) {
          if (item.hasOwnProperty(property) && property !== '_id') {
            console.log(property)
            let newLine = document.createElement('p')
            newLine.textContent = item[property]
            newObject.appendChild(newLine)
          }
        }

        articles.appendChild(newObject)
      })
    })
  })
}
