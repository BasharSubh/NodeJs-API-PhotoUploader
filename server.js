const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connection = require('./config/dbConnection');
const validateToken = require('./middleware/validateToken');
const Upload = require('./models/uploadsModel');
const path = require('path');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

connection();

app.use('/profilePhotos', express.static('uploads/profilePhotos'));
app.use('/file', async (req, res, next) => {
  const photo = await Upload.findOne({ file: req.url.substring(1) });
  if (photo && photo.public) {
    // If the photo is public, serve it as a static file from 'uploads/usersPhotos'
    express.static('uploads/usersPhotos')(req, res, next);

    const currentViews = photo.viewsCount

    await Upload.findByIdAndUpdate(
        photo.id,
        { viewsCount: currentViews + 1 },
    )

  } else {
    // If the photo is not public, validate the token before serving the photo
    validateToken(req, res, async () => {
      if (photo.user_id.toString() !== req.user.id.toString()) {
        return res.status(401).json({error : "this photo set to private by its own user"})
    }
      express.static('uploads/usersPhotos')(req, res, next);
    });
  }
});

app.use(express.json());

app.use('/users', require('./routes/usersRoutes'));

app.use('/uploads', require('./routes/uploadsRoutes'));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to The photo upload API',
    github: 'https://github.com/BasharSubh/NodeJs-API-PhotoUploader',
    author: 'Bashar Subh',
    open_source: true,
    api_version: '1.0.0',
    documentation: 'https://github.com/BasharSubh/NodeJs-API-PhotoUploader#readme',
    endpoints: [
      {
        url: '/uploads/',
        description: 'refer to the documentation for more info',
      },
      {
        url: '/users/',
        description: 'refer to the documentation for more info',
      },
    ],
  });
});


app.all('*', (req, res, next) => {
  res.status(404);
  next(new Error('Route not found'));
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`app working on port ${port}`);
});
