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
exports.modifypost =(req, res, next) => {
    
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    post.findOne({ _id: req.params.id })
    .then((post) => {
        if (post.userId !== req.auth.userId) {
          res.status(403).json({error: 'Requête non authorisée'});
        }
        else {
        post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
            .then(() => res.status(201).json({ message : 'post updated successfully!'}))
            .catch((error) => res.status(400).json({error: error}));
        }
    })
};
//----------------------------------------------------------
exports.deletepost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
    .then((post) => {
        if (!post) {
          res.status(404).json({error: 'post non existante'});
        }
        if (post.userId !== req.auth.userId) {
          res.status(403).json({error: 'Requête non authorisée'});
        }
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,() =>{
            post.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Deleted!'}))
                .catch((error) => res.status(400).json({error: error}));
        });
    })
    .catch(error => res.status(500).json({ error }))
};
//----------------------------------------------------------
exports.likepost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(post => {
            console.log('post to be liked:',post);
            if (req.body.like === 1) {
                if (post.usersLiked.includes(req.body.userId)) 
                {
                    res.status(401).json({error: 'post déja liké'});
                }
                else
                {
                    post.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
                        .then((post) => {
                            console.log('updated post',{post})
                            res.status(200).json({ message: 'Like ajouté !' })
                        })
                        .catch(error => res.status(400).json({ error }))
                }

            } 
            else if (req.body.like === -1) {
                if (post.usersDisliked.includes(req.body.userId)) {
                    res.status(401).json({error: 'post déja disliké'});
                }
                else
                {   
                    post.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
                        .then((post) => res.status(200).json({ message: 'Dislike ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            } 
            else 
            {
                if (post.usersLiked.includes(req.body.userId)) 
                {
                    post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((post) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }));
                } 
                else if (post.usersDisliked.includes(req.body.userId)) 
                {
                    post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                            .then((post) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                            .catch(error => res.status(400).json({ error }));
                }
                else {
                    throw 'invalid request'
                }
            }
        })
        .catch(error => res.status(400).json({ error }));   
}