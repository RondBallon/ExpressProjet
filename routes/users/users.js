const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route pour afficher le formulaire de création d'un utilisateur
router.get('/create', userController.createUserForm); // Route spécifique pour "create"

// Route pour afficher le formulaire d'édition d'un utilisateur
router.get('/:id/edit', userController.editUser); // Route spécifique pour "edit"

// Route pour afficher tous les utilisateurs
router.get('/', userController.getUsers); // Route générale pour afficher tous les utilisateurs

// Route pour afficher un utilisateur spécifique
router.get('/:id', userController.getUser); // Route spécifique pour un utilisateur

// Route pour traiter la création d'un utilisateur
router.post('/', userController.createUser);

// Route pour mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;


