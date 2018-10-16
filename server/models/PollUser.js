const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  type: {
    type: String,
    required: true,
  }
});

var PollUser =  mongoose.model('PollUser', PollUserSchema);

module.exports = {PollUser};
