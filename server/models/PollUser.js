const mongoose = require('mongoose');
const verMail = require('../verMail');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const validator = require('validator');

var PollUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  uname: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  type: {
    type: String,
    required: true,
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  verHash: {
    type: String
  }
});

PollUserSchema.methods.isWorking = () => console.log('is Working fine :)');

PollUserSchema.methods.renderDash = function (res) {
  pollUser = this;
  if(pollUser.isVerified){
    res.render('pages/dash.ejs', {'Name': pollUser.name});
  } else {
    res.send('<p>Your account is not verified! Please go to your mail and verify your account!</p>')
  }
};

PollUserSchema.methods.verProcess = function () {
  var pollUser = this;

  var token = jwt.sign({email: pollUser.email}, '<JWTSecretKeyForPollUser>', {expiresIn: 100});

  pollUser.verHash = token;

  return new Promise((resolve,reject) => {

    var verLink = `http://localhost:3000/verify/${token}`;

    verMail(pollUser.email, verLink)
    .then((info) => {
      resolve(info);
    })
    .catch((e) => {
      reject(e);
    });
  });
};

PollUserSchema.statics.searchAndVerify = function (email) {
  var PollUser = this;
  return PollUser.update(
    {email},
    {$set: {
      isVerified: true
    }},
    {new: true}
  );
};

var PollUser =  mongoose.model('PollUser', PollUserSchema);


//PollUser Utils ------------------------------------


//Saving passed object as PollUser-----------
const savePollUser = (newPollUser) => {

  var pollUser = new PollUser(newPollUser);
  return pollUser.save()
};


module.exports = {PollUser, savePollUser};
