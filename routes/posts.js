var express = require('express');
var router = express.Router();

// route GET pour affichage de tous les posts dans browser
router.get('/', function (req, res, next) {
  res.send('GET posts try');
});
// route GET pour l'affichage d'un post
router.get('/:post_id', function (req, res, next) {
  res.send('GET posts try');
});

// route POST pour ajout de post
router.post('/add', function (req, res, next) {
  res.send('Un nouveau post à été ajouté');
});

// route PUT pour modifier un post  
router.put('/modifiy/:post_id', function (req, res, next) {
  res.send(`Le post {:post_id} à été modifié`);
});

// route DELETE pour supprimer un post
router.delete('/delete/:post_id', function (req, res, next) {
  res.send(`Le post {:post_id} à été supprimé`);
});

module.exports = router;