var express = require('express');
var router = express.Router();
var controller = require('../controllers/postsController')

router.get('/post_form', controller.postForm);

// route GET pour affichage de tous les posts dans browser
router.get('/', controller.getPosts);

// route GET pour l'affichage d'un post
router.get('/:id', controller.getPost);

// route POST pour ajout de post
router.post('/add', controller.createPost);

// route PUT pour modifier un post  
router.put('/modify/:id', controller.updatePost);

// route DELETE pour supprimer un post
router.delete('/delete/:id', controller.deletePost);

module.exports = router;