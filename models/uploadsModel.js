const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    },
    fileOriginalName: {
        type: String,
    },
    file: {
        type: String,
    },
    size: {
        type: String,
    },
    public: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
    }
},
    {
    timestamps : true
}
)

module.exports= mongoose.model('Upload', uploadSchema)