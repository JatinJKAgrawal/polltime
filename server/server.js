const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const ejs = require('ejs');


var {mongoose} = require('./db/mongoose');
var {PollUser} = require('./models/PollUser');
var publicPath = path.join(__dirname, './public');


const app = express();
const server = http.createServer(app);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('common'));

/**
start-Testing_____________________________________
**/


/**
end-Testing_______________________________________
**/



app.get('/', (req, res) => {
res.redirect('/users');
});

//statics middleware
// app.use(express.static(publicPath));

//first route-----------------------------------
app.get('/users', (req, res) => {
  PollUser.find()
  .then((users) => {  res.render('pages/users.ejs', {'users': users}); })
  .catch((e) => { res.send(e); });
});

//users-----------------------------------------
app.get('/addUser', (req, res) => {
  res.render('pages/addUser.ejs');
});


//create user --------------------------------------------
app.post('/user_create', (req, res) => {
  // console.log(req.body);
  var pollUser = new PollUser({
    name: req.body.addUser_form_name,
    uname: req.body.addUser_form_uname,
    password: req.body.addUser_form_pass,
    type: req.body.addUser_form_type
  });
  pollUser.save()
  .then((createdUser) => {
    res.send(createdUser);
  })
  .catch((e) => {
    res.send(e);
  });
});



//sshh----server listening ;)____________________________________________
server.listen(3000, () => {
  console.log('Server up at port 3000 ;)');
});
