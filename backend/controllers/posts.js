const post = require('../models/post');
const fs = require('fs');


exports.createpost = (req, res, next) => {
    console.log(req.body)
    const postObject = req.body;
    const newPost = new post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    newPost.likes = 0;
    newPost.dislikes = 0;
    newPost.save()
        .then(() => res.status(201).json({ message : 'post postée !'}))
        .catch((error) => res.status(400).json({error: error}));
};
//----------------------------------------------------------
exports.getOnepost = (req, res, next) => {
    post.findOne({_id: req.params.id})
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({error: error}));
};
//----------------------------------------------------------
exports.getAllPosts = (req, res, next) => {
    post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({error: error}));
};
//----------------------------------------------------------
exports.modifypost = (req, res, next) => {
  
    const postObject = req.file
      ? {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    
  
    post
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { ...postObject },
        }
      )
      .then(() => res.status(201).json({ message: 'post updated successfully!' }))
      .catch((error) => res.status(400).json({ error: error }));
  
    
  };
// exports.modifypost =(req, res, next) => {
    
//     const postObject = req.file ?
//     {
//         ...JSON.parse(req.body.post),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : {...req.body};
//     post.findOne({ _id: req.params.id })
//     .then((post) => {
//         if (post.userId !== req.auth.userId) {
//           res.status(403).json({error: 'Requête non authorisée'});
//         }
//         else {
//         post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
//             .then(() => res.status(201).json({ message : 'post updated successfully!'}))
//             .catch((error) => res.status(400).json({error: error}));
//         }
//     })
// };
//----------------------------------------------------------
exports.deletepost = async (req, res, next) => {
    try {
        const foundPost = await post.findOne({ _id: req.params.id })
        if (!foundPost) {
            return res.status(404).json({error: 'post non existant'});
        }
        if (foundPost.userId !== req.auth.userId && !req.auth.isAdmin) {
            return res.status(403).json({error: 'Requête non authorisée'});
        }
        const filename = foundPost.imageUrl.split('/images/')[1];
        await fs.unlinkSync(`images/${filename}`) 
        await foundPost.deleteOne({_id: req.params.id})
        return res.status(200).json({ message: 'Deleted!'});
    } catch(e) {
        console.log(e);
        return res.status(400).send(e);
    }
    
};
//----------------------------------------------------------
exports.likepost = async (req, res, next) => {
    const userId = req.body.userId
    let foundPost = await post.findOne({
        _id: req.params.id
    })
    if (foundPost.usersLiked.includes(userId)) {
        // disliked.
        const userLiked = foundPost.usersLiked.filter(item => item !== userId);
        console.log(userLiked);
        foundPost = await post.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                usersLiked: userLiked,
                likes: userLiked.length
            }
        }, {
            new: true,
        })
    } else {
        foundPost.usersLiked.push(userId);
        foundPost = await post.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                usersLiked: foundPost.usersLiked,
                likes: foundPost.usersLiked.length
            }
        }, {
            new: true,
        })
    }
    return res.status(200).send(foundPost);
  };