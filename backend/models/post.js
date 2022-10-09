const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
    imageUrl: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],
  });

module.exports = mongoose.model('post', postSchema);