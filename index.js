var jsonServer = require('json-server')
var clone = require('clone')
var data = require('./data.json')

var port = process.env.PORT || 3000

var app = jsonServer.create()
var router = jsonServer.router(clone(data))

app.all('*', function(req, res, next) {
  router.db.object = clone(data)
  console.log('------- HEADERS -------')
  console.log('Origin: ' + req.headers.origin)
  console.log('Content-Type: ' + req.headers['content-type'])
  console.log('------- HEADERS -------')
  next()
})

app.use(jsonServer.defaults())
app.use(router)

app.listen(port, function() {
  console.log('JSONPlaceholder listening on http://localhost:' + port)
})
