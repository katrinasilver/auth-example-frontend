const { request } = require('./helpers')

const images = ['hawks.png','lemurs.png','sharks.png','velociraptors.png'].map(e => `/img/${e}`)

function setRandomImgSource(element, array){
  let randomIndex = Math.floor(Math.random() * array.length)
  const currentImage = `/img/${element.src.match(/\w*.png/)[0]}`

  while(array[randomIndex] === currentImage){
    randomIndex = Math.floor(Math.random() * array.length)
  }

  element.setAttribute('src', array[randomIndex])
}

function addEventHandlers(){
  // handle click on logo to switch logos
  document.querySelector('#logo').addEventListener('click', function(event){
    setRandomImgSource(document.querySelector('#logo'), images)
  })

  // handle login form
  document.querySelector('.form-signin').addEventListener('submit', function(event){
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    request('/auth/token', 'post', { username , password })
    .then(function(response){
      document.querySelector('#error').classList.add('hide-auth-error')
      localStorage.setItem('token', response.data.token)
      window.location = '/protected.html'
    })
    .catch(function(error){
      document.querySelector('#error').classList.remove('hide-auth-error')
    })
  })
}


function init(){
  setRandomImgSource(document.querySelector('#logo'), images)

  addEventHandlers()
}

module.exports = { init }








