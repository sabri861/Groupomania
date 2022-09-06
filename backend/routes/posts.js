// toute les URL de mon API son defini ici pour chaque URL on definie une logique metier //
const express = require('express');
const router = express.Router();

const ctrlPosts = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, ctrlPosts.createpost);
router.get('/:id', auth, ctrlPosts.getOnepost);
router.get('/', auth, ctrlPosts.getAllPosts);
router.put('/:id', auth, multer, ctrlPosts.modifypost);
router.delete('/:id', auth, ctrlPosts.deletepost);
router.post('/:id/like', auth, ctrlPosts.likepost);

module.exports = router;