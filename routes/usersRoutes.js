const express = require('express');
const { currentUser, updateUser, createUser, loginUser } = require('../controllers/usersControlers');
const router = express.Router();
const multer = require('multer');
const validateToken = require('../middleware/validateToken');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/profilePhotos/', 
  filename: (req, file, cb) => {
      
      const fileExt = path.extname(file.originalname);
      const fileName = Date.now() + '-' + req.user.id + fileExt;

      const maxSizeInBytes = 20971520; // 20 MB in bytes

      if (file.size > maxSizeInBytes) {
          return cb(new Error("Maximum file size is 20 MB"));
      }
      
      if (!file.mimetype.startsWith('image/')) {
          return cb(new Error("Only image files (photos) are allowed"));
      }

        cb(null, fileName)
  }
})

const upload = multer({ storage: storage });

router.route('/current').get(validateToken, currentUser);

router.route('/register').post(upload.single('photo'), createUser);

router.route('/login').post(loginUser)

router.route('/update').put(validateToken, updateUser);


module.exports = router;
