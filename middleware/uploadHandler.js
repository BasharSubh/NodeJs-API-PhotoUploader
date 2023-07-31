const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const destinationPath = `uploads/usersPhotos/${req.user.id}`;
    const destinationPath = `uploads/usersPhotos/`;
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Get the file extension
    const fileExt = path.extname(file.originalname);

    // const fileName = Date.now() + '-' + encodeURI(file.originalname);

    const fileName = Date.now() + '-' + req.user.id + fileExt;

    const maxSizeInBytes = 20971520; // 20 MB in bytes

    if (file.size > maxSizeInBytes) {
      return cb(new Error("Maximum file size is 20 MB"));
    }
    
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error("Only image files (photos) are allowed"));
    }

    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
