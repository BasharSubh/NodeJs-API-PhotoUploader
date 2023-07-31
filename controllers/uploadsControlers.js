const asyncHandler = require('express-async-handler')
const Upload = require('../models/uploadsModel')

const getAllPhotos = asyncHandler(async (req, res) => {
    const photos = await Upload.find({user_id: req.user.id})

    res.status(200).json(photos)
})

const getPhoto = asyncHandler(async (req, res) => {
    
    const photo = await Upload.findById(req.params.id)

    if (!photo) {
        res.status(404)
        throw new Error("photo not found")
    }

    if (photo.public) {
        return  res.status(200).json(photo)    
    }
    

    if (photo.user_id.toString() !== req.user.id.toString()) {
        res.status(401)
        throw new Error("you cant view this photo")
    }

    const currentViews = photo.viewsCount

    await Upload.findByIdAndUpdate(
        req.params.id,
        { viewsCount: currentViews + 1 },
    )

    res.status(200).json(photo)
})

// const likePhoto = asyncHandler(async (req, res) => {

//     const photo = await Upload.findById(req.params.id)

//     if (!photo) {
//         res.status(404)
//         throw new Error("photo not found")
//     }


// })


const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload the photo');
    }
  
    const encodedFileName = encodeURIComponent(req.file.originalname)

    const { isPublic } = req.body;
  
    const newUpload = await Upload.create({
      fileOriginalName: encodedFileName,
      file: req.file.filename,
      size: req.file.size,
      type: req.file.mimetype,
      user_id: req.user.id,
      public: isPublic || false,
    });
  
    res.status(201).json(newUpload);
  });
  

const updatePhoto = asyncHandler(async (req, res) => {

    const photo = await Upload.findById(req.params.id)

    const { isPublic } = req.body
    
    if (!photo) {
        res.status(404)
        throw new Error("photo not found")
    }

    if (photo.user_id.toString() !== req.user.id.toString()) {
        res.status(401)
        throw new Error("you cant update someone else  photo")
    }

    await Upload.findByIdAndUpdate(
        req.params.id,
        {public : isPublic}
    )

    res.status(200).json(photo)

})


const deletePhoto = asyncHandler(async (req, res) => {
    const photo = await Upload.findById(req.params.id)

    if (!photo) {
        res.status(404)
        throw new Error("photo not found")
    }

    if (photo.user_id.toString() !== req.user.id.toString()) {
        res.status(401)
        throw new Error("you cant delete someone else photo")
    }

    await Upload.deleteOne({ _id: req.params.id })

    res.status(200).json({message : `delete photos id ${photo}`})
})

module.exports = {getAllPhotos, getPhoto, uploadPhoto, deletePhoto, updatePhoto}