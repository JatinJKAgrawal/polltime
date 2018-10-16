const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const path = require('path');
const ejs = require('ejs');


var {mongoose} = require('./db/mongoose');
var {PollUser} = require('./models/PollUser');
var publicPath = path.join(__dirname, './public');


const app = express();
const server = http.createServer(app);


app.set('view engine', 'ejs');
app.use(bodyParser.json());
/**
start-Testing_____________________________________
**/


/**
end-Testing_______________________________________
**/





//statics middleware
// app.use(express.static(publicPath));

//first route-----------------------------------
app.get('/users', (req, res) => {
  PollUser.find()
  .then((users) => {  res.render('pages/users.ejs', {'users': users}); })
  .catch((e) => { res.send(e); });
});

//users-----------------------------------------
app.post('/addUser', (req, res) => {

});






//sshh----server listening ;)____________________________________________
server.listen(3000, () => {
  console.log('Server up at port 3000 ;)');
});
