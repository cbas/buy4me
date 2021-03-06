'use strict'

var lock = new window.Auth0Lock(
  'cIIrD1MBSLMcYdY6f1rYi6KtU2IDHXtz',
  'peonicles.auth0.com'
  )

// var userProfile = null

document.getElementById('btn-login').addEventListener('click', function () {
  lock.show({ authParams: { scope: 'openid' } })
})

document.getElementById('btn-logout').addEventListener('click', function () {
  window.localStorage.removeItem('id_token')
  window.location.href = '/'
})

const hash = lock.parseHash(window.location.hash)
if (hash && hash.id_token) {
  // save the token in the session:
  window.localStorage.setItem('id_token', hash.id_token)
}

if (hash && hash.error) {
  window.alert('There was an error: ' + hash.error + '\n' + hash.error_description)
}

// retrieve the profile
const id_token = window.localStorage.getItem('id_token')
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      console.warn('There was an error getting the profile: ' + err.message)
    }
    document.getElementById('authUser').textContent = profile.name
  })
}

// Fetch functions

function fetchData (endpoint, containerId) {
  window.fetch(endpoint, {
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
    },
    method: 'GET',
    cache: false
  }).then(function (response) {
    return response.json().then(function (json) {
      const articles = document.getElementById(containerId)
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

function getAllArticles (endpoint, containerId) { fetchData(endpoint, containerId) }
function getRequestedArticles (endpoint, containerId) { fetchData(endpoint, containerId) }
function getAllTravellers (endpoint, containerId) { fetchData(endpoint, containerId) }
function getAllRequestors (endpoint, containerId) { fetchData(endpoint, containerId) }

setInterval(getAllArticles('/items', 'place-publicpage'), 60000) // Fetches every 60s
setInterval(getRequestedArticles('/items/requested', 'place-myorders'), 60000)
setInterval(getAllTravellers('/travellers/france', 'place-countrypage'), 60000)
setInterval(getAllRequestors('/requestors/singapore', 'place-trendingpage'), 60000)
