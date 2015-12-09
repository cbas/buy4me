function getAllArticles () {
  window.fetch('/items', {
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
    },
    method: 'GET',
    cache: false
  }).then(function (response) {
    return response.json().then(function (json) {
      const articles = document.getElementById('data-publicpage')
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
////

function getCountries(endpoint, containerId) {
  fetchData(endpoint, containerId)
}

function getAllArticles(endpoint, containerId) {
  fetchData(endpoint, containerId)
}

getCountries('/country', place-countrypage)
getAllArticles('/items', place-items)






////

renderOnHTML(response, 'datapublicpage', json, item)

(function renderOnHTML(response, elementId, json, item) {
  return response.json().then(function (json) {
    const articles = document.getElementById('data-publicpage')
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
