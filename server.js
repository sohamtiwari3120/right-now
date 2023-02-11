const express = require('express');
const app = express();
const http = require('http').Server(app);

const path = require('path');

app.use(express.static('src'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/src/index.html'));
});
let PORT = process.env.PORT || 5500
http.listen(PORT, function(){
  console.log(`Your server is up and running on Port ${PORT}. Good job!`);
});