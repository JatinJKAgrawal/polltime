const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');//logger
const http = require('http');
const path = require('path');
const ejs = require('ejs');


var {mongoose} = require('./db/mongoose');
var publicPath = path.join(__dirname, './public');


const app = express();
const router = require('./routes.js')
const server = http.createServer(app);


//Middlewares and Set-up--------
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('common'));
app.use('/',router);



/**
start-Testing_____________________________________
**/


/**
end-Testing_______________________________________
**/




//sshh----server listening ;)____________________________________________
server.listen(3000, () => {
  console.log('Server up at port 3000 ;)');
});
