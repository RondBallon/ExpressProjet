// Importation du modèle Sequelize pour les utilisateurs
const User = require('../models/User');

// Fonction pour récupérer tous les utilisateurs.
const getUsers = async (req, res) => {
  try {
    // Utilisation de Sequelize pour récupérer tous les utilisateurs dans la base de données.
    const users = await User.findAll();
    // Retourner la liste des utilisateurs en JSON.
    res.json(users);
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Fonction pour récupérer un utilisateur spécifique par son identifiant.
const getUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par sa clé primaire (ID).
    const user = await User.findByPk(req.params.id);
    if (!user) {
      // Si aucun utilisateur n'est trouvé, retourner une erreur 404.
      return res.status(404).json({ message: 'User not found' });
    }
    // Retourner l'utilisateur trouvé en JSON.
    res.json(user);
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Fonction pour afficher le formulaire de création d'un utilisateur.
const createUserForm = (req, res) => {
  console.log("Rendering create user form..."); // Log pour vérifier si la fonction est appelée.
  try {
    // Rendre la vue pour le formulaire de création.
    res.render('users/create'); // Assurez-vous que le fichier 'create.pug' existe.
  } catch (error) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error("Erreur lors du rendu de la vue :", error);
    res.status(500).send("Erreur interne du serveur");
  }
};

// Fonction pour traiter la soumission du formulaire et créer un utilisateur.
const createUser = async (req, res) => {
  try {
    // Récupérer les données du formulaire.
    const { username, password, avatar, description } = req.body; 
    
    // Créer l'utilisateur dans la base de données.
    const user = await User.create({ username, password, avatar, description });
    
    // Une fois l'utilisateur créé, rediriger vers la liste des utilisateurs.
    res.redirect('/users'); // Rediriger vers la page des utilisateurs.
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
};

// Fonction pour afficher le formulaire d'édition d'un utilisateur.
const editUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par son ID.
    const user = await User.findByPk(req.params.id);
    if (!user) {
      // Si aucun utilisateur n'est trouvé, retourner une erreur 404.
      return res.status(404).json({ message: 'User not found' });
    }
    // Rendre le formulaire d'édition avec les données de l'utilisateur.
    res.render('users/edit', { user });
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).json({ message: 'Error fetching user for edit' });
  }
};

// Fonction pour mettre à jour un utilisateur existant.
const updateUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par son ID.
    const user = await User.findByPk(req.params.id);
    if (!user) {
      // Si aucun utilisateur n'est trouvé, retourner une erreur 404.
      return res.status(404).json({ message: 'User not found' });
    }
    // Mettre à jour les données de l'utilisateur avec celles fournies dans la requête.
    await user.update(req.body);
    // Retourner les données de l'utilisateur mis à jour.
    res.json(user);
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Fonction pour supprimer un utilisateur existant.
const deleteUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par son ID.
    const user = await User.findByPk(req.params.id);
    if (!user) {
      // Si aucun utilisateur n'est trouvé, retourner une erreur 404.
      return res.status(404).json({ message: 'User not found' });
    }
    // Supprimer l'utilisateur de la base de données.
    await user.destroy();
    // Confirmer la suppression de l'utilisateur.
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    // Gérer les erreurs et afficher un message dans la console.
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers.
module.exports = {
  getUsers,        // Récupérer tous les utilisateurs.
  getUser,         // Récupérer un utilisateur spécifique.
  createUser,      // Créer un nouvel utilisateur.
  createUserForm,  // Afficher le formulaire de création d'utilisateur.
  updateUser,      // Mettre à jour un utilisateur.
  deleteUser,      // Supprimer un utilisateur.
  editUser,        // Afficher le formulaire d'édition d'utilisateur.
};
