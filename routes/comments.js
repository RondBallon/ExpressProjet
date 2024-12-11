//Import des modules nécessaires
const express = require("express"); //Permet de charger Express
const router = express.Router(); // Crée un routeur qui va nous permettre de définir nos routes

const commentsController = require("../controllers/commentsController.js");

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
router.get("/form", commentsController.updateCommentForm);

// route pour modifier un commentaire
//méthode HTTP : PUT
router.put("/listComments/update/:id", commentsController.updateComment);

//route pour supprimer un commentaire
//Méthode HTTP : DELETE
router.delete("/delete/:id", commentsController.deleteComment);

module.exports = router;
