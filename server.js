var express  = require("express");

var port = process.env.PORT || 5001;
var app  = express();

app.use(express.logger());
app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(port);
