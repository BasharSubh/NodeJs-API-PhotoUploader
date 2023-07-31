const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('you have to fill everything');
  }

  const userAvailability = await Users.findOne({ email })
  
  if (userAvailability) {
    res.status(400);
    throw new Error('email is already registered');
  }

  let profilePicture = null;

  if (req.file) {
    profilePicture = encodeURIComponent(req.file.filename);
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
    profilePicture, 
  });

  if (user) {
    res.status(201).json({_id: user.id, email: user.email, username: user.username})
  } else {
    res.status(400)
    throw new Error('user data not valid')
  }

});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('you have to fill everything');
  }

  const user = await Users.findOne({ email });

  if (!user) {
    res.status(400)
    throw new Error('email address not registered')
  }

  if (await bcrypt.compare(password, user.password)) {
    
    const uploadToken = jwt.sign({
      user: {
        id: user.id,
        email: user.email,
        username : user.username
      }
    },
      process.env.TOKEN,
      { expiresIn: "30m" }
    )
    res.status(200).json({ uploadToken })
  } else {
    res.status(401) 
    throw new Error('email or password not match')
  }

})

const currentUser = asyncHandler(async (req, res) => {
  const user = req.user

  if (!user) {
    res.status(401);
    throw new Error('please log in first');
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {

  const user = await Users.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('please log in first');
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400)
    throw new Error('please fill the new info')
  }

  const updatedUser = await Users.findByIdAndUpdate(
    req.user.id,
    { password, username },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

// const deleteUser = asyncHandler(async (req, res) => {

//   const user = await Users.findById(req.params.id);

//   if (!user) {
//     res.status(404);
//     throw new Error('user not found');
//   }

//   await Users.deleteOne({ _id: req.params.id });
//   res.status(200).json({ message: `delete user id ${req.params.id} ` });
// });

module.exports = { currentUser, updateUser, createUser, loginUser };
