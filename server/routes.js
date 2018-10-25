const express = require('express');
const jwt = require('jsonwebtoken');
const verMail = require('./verMail');
const router = express.Router();

var {PollUser, savePollUser, verPollUser} = require('./models/PollUser');

//Routes-----------------
router.get('/', (req, res) => {
  res.send('Welcome to HomePage! <a href="/users"><button>See Users</button></a>');
});




//list users-----------------------------
router.get('/users', (req, res) => {
  PollUser.find()
  .then((users) => {  res.render('pages/users.ejs', {'users': users}); })
  .catch((e) => { res.send(e); });
});




//add user route---------------------
router.get('/addUserForm', (req, res) => {
  res.render('pages/addUserForm.ejs');
});




//create user --------------------------------------------
router.post('/addUser', (req, res) => {

  savePollUser(req.body).then((createdUser) => {
    return createdUser.verProcess();
  })
  .then((info) => {
    console.log('Email sent: ', info);
    res.send(`Please verify your account. Verification link sent to your mail id ${req.body.email} .`);
  })
  .catch((e) => {
    res.send(e);
  });
});

router.get('/verify/:verHash', (req, res) => {
  jwt.verify(req.params.verHash, '<JWTSecretKeyForPollUser>', (err, rData) => {
    if(err){
      if(!(err.name === 'TokenExpiredError')) res.send(err);//Error but not about Expiry
      else{//Error about expiry
        res.send('<p>Token Expired! Generate a new token <a href="http://localhost:3000/reGenActLinkForm">here!</a></p>')
      }
    } else {//No error....we Have rData(Recovered) data
      var {email} = rData;
      PollUser.searchAndVerify(email).then((aff) => {
        res.send('<p>Account Verified Successfuly. Now you can <a href="http://localhost:3000/login">login here!</a><p>');
      }).catch((err) => {
        res.send(err);
      });
    }
  });
});


//reGenActLink routes_______________________________________________________
router.get('/reGenActLinkForm', (req, res) => {
  res.render('pages/reGenActLinkForm');
});

router.post('/reGenActLink', (req, res) => {
  var email = req.body.email;
  PollUser.findOne({email}).then(
    (foundUser) => {
      if (foundUser){
        return foundUser.verify();
      } else {
        res.send(`Please verify your account. Verification link sent to your mail id ${email} .`)
      }
    }
  ).then((info) => {
    console.log('Email sent: ', info);
    res.send(`Please verify your account. Verification link sent to your mail id ${email} .`);
  })
  .catch((e) => {
    res.send(e);
  });
});



//Login routes_______________________________________________________
router.get('/login', (req, res) => {
  res.render('pages/login.ejs');
});

router.post('/login', (req, res) => {
  var {email, password} = req.body;
  PollUser.findOne({email, password}).then((foundUser) => {
    if(!foundUser){
      console.log('user not found: ',foundUser);
      return res.send('Incorrect user ID or password!');
    }
    foundUser.renderDash(res);
  }).catch((e) => {
    res.send(e);
  });
});



module.exports = router;
