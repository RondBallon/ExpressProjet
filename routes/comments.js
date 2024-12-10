//Import des modules nécessaires
<<<<<<< HEAD
const express = require("express"); //Permet de charger Express
const router = express.Router(); // Crée un routeur qui va nous permettre de définir nos routes

const commentsController = require("../controllers/commentsController.js");
=======
const express = require('express'); //Permet de charger Express
const router = express.Router(); // Crée un routeur qui va nous permettre de définir nos routes

const commentsController = require('../controllers/commentsController.js');
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)

<<<<<<< HEAD
/* const  { 
  editCommentForm,
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment 
} = require('../controllers/commentsController.js'); */

<<<<<<< HEAD
=======
>>>>>>> 5fdb45e (fix des routes /form /form:id on peut afficher le formulaire d'ajout de commentaire, ajouter un comentaire, afficher tous les commentaires existants dans la bdd et afficher un commentaire en particulier via son id)
/***********  CRUD **************/
//route pour afficher le formulaire de création de commentaire
router.get("/form", commentsController.editCommentForm);

// route pour traiter la création d'un nouveau commentaire
// Méthode HTTP : POST
router.post("/", commentsController.createComment);

// route pour afficher tous les commentaires
//Méthode HTTP : GET
router.get("/listComments", commentsController.getAllComments);

//route pour afficher un commentaire spécifique
router.get("/form/:id", commentsController.getComment);

//route pour afficher le formulaire de modification d'un commentaire
//router.get("/form", commentsController.updateCommentForm);

// route pour modifier un commentaire
//méthode HTTP : PUT
router.put("/listComments/update/:id", commentsController.updateComment);

//route pour supprimer un commentaire
//Méthode HTTP : DELETE
router.delete("/delete/:id", commentsController.deleteComment);

module.exports = router;
=======
<<<<<<< HEAD
=======
const express = require('express'); //Permet de charger Express
const router = express.Router(); // Crée un routeur qui va nous permettre de définir nos routes

const commentsController = require('../controllers/commentsController.js');

/* const  { 
  editCommentForm,
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment 
} = require('../controllers/commentsController.js'); */

>>>>>>> 685c5bc (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)

/***********  CRUD **************/ 
//route pour afficher le formulaire de création de commentaire
router.get('/createComment', commentsController.editCommentForm)

// route pour traiter la création d'un nouveau commentaire
  // Méthode HTTP : POST
router.post('/', commentsController.createComment)


// route pour afficher tous les commentaires
  //Méthode HTTP : GET
router.get('/listComments', commentsController.getAllComments)
  
  
  //route pour afficher un commentaire spécifique
  router.get('/:comment_id', commentsController.getComment)


// route pour modifier un commentaire
  //méthode HTTP : PUT 
router.put('/:comment_id', commentsController.updateComment)



//route pour supprimer un commentaire 
  //Méthode HTTP : DELETE
router.delete('/:comment_id', commentsController.deleteComment)


module.exports = router;



<<<<<<< HEAD
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
=======
>>>>>>> 3378dac (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
>>>>>>> 685c5bc (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
