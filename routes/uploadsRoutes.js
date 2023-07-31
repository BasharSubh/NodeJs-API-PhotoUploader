const express = require('express');
const {getAllPhotos, getPhoto, uploadPhoto, deletePhoto, updatePhoto} = require('../controllers/uploadsControlers');
const router = express.Router()
const validateToken = require('../middleware/validateToken');
const upload = require('../middleware/uploadHandler');


router.use(validateToken)

router.route('/').get(getAllPhotos)

router.route('/:id').get(getPhoto)

router.route('/').post(upload.single('file'), uploadPhoto)

router.route('/:id').delete(deletePhoto)

router.route('/:id').put(updatePhoto)

module.exports = router