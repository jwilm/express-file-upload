var
  express = require("express"),
  path = require("path"),
  app = express()

/* Verbose logging of requests */
app.use(express.logger('dev'))



/* Use jade to render views from /views directory */
app.set('views',__dirname + '/views')
app.set('view engine', 'jade')

/* Required for our demo */
app.use(express.bodyParser({uploadDir: __dirname + "/public", keepExtensions: true}))

/* router */
app.use(app.router)

/* Load static files under /public */
app.use(express.static(__dirname + '/public'))

/* Handle errors */
app.use(express.favicon())
app.use(express.errorHandler())

/* Mount a single page at / */
app.get('/', function(req, res) {
  res.render('index')
})

/* Uploads will be sent here */
app.post('/upload', function(req, res) {
  console.log('Received POST /upload')

  var confirmation = {}
  for(var key in req.files)
  {
    confirmation[key] = req.files[key].path.replace(__dirname, "")
  }

  res.json(confirmation)
})

app.listen(3000, function() {
  console.log("Express listening at port 3000")
})
