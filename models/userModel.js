const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please add a username'],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: [true, 'email is already registered']
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
    },
    profilePicture: {
      type: String, // You can store the filename or the full path of the uploaded image here
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', usersSchema);
