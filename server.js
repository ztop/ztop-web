var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname + '/public'))
  .use(function(req, res) {
    require('send')(req, __dirname + '/public/index.html').pipe(res);
  });

var port = process.argv[2] || 8000;

require('http').createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});