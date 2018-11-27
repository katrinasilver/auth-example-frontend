const index = require('./src/index')
const protected = require('./src/protected')



const pageInitialization = {
  '/' : index.init,
  '/index.html': index.init,
  '/protected.html' : protected.init
}

const path = window.location.pathname
 
if(pageInitialization.hasOwnProperty(path)) {
  pageInitialization[path]()
}
else {
  console.error(`${path} does not have an initializer`)
}



