var express = require("express");
const axios = require("axios");
var app = express();
var path = require("path");
var cors = require('cors');


app.use(cors());

app.use(express.static(__dirname + '/public'));
const BUILD_URL = "/index.html";

app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, BUILD_URL));
});

app.listen(process.env.PORT || 4000, function() {
  console.log("Example app listening on port 4000!");
  if (process.send) {
    process.send('online');
  }
});
