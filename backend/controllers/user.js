const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email:req.body.email,
            password: hash
        });
        user.save()
            .then(()=>res.status(201).json({ message : 'utilisateur crée !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//----------------------------------------------------------
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: error});
            }
            const isAdmin = user.isAdmin || false
            res.status(200).json({
              userId: user._id,
              isAdmin,
              token: jwt.sign(
                { userId: user._id, email: req.body.email, isAdmin },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
//----------------------------------------------------------

exports.modifyUser = (req, res, next) => {
  User
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body },
      }
    )
    .then(() => res.status(201).json({ message: 'User updated successfully!' }))
    .catch((error) => res.status(400).json({ error: error }));
};

//----------------------------------------------------------

exports.deleteUser = async (req, res, next) => {
  try {
      const foundUser = await User.findOne({ _id: req.params.id })
      if (!foundUser) {
          return res.status(404).json({error: 'user non existante'});
      }
      const userId = foundUser._id.valueOf()
      const isAdmin = req.auth.isAdmin
      console.log("delete user:", userId, req.auth.userId, isAdmin)
      if (userId !== req.auth.userId && !isAdmin) {
        return res.status(403).json({error: 'Requête non authorisée'});
      }

      // A && B
      // !(A || B)
      // !A || !B
      await foundUser.deleteOne({_id: req.params.id})
      return res.status(200).json({ message: 'Deleted!'});
  } catch(e) {
      console.log(e);
      return res.status(400).send(e);
  }
  
};