const User = require('../models/User');

// Fonction pour récupérer tous les utilisateurs.
const getUsers = async (req, res) => {
  try {
    // Utilisation de Sequelize pour récupérer tous les utilisateurs dans la base de données.
    const users = await User.findAll();
    // Retourner la liste des utilisateurs en JSON.
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Fonction pour récupérer un utilisateur spécifique par son identifiant.
const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Fonction pour afficher le formulaire de création d'un utilisateur
const createUserForm = (req, res) => {
    console.log("Rendering create user form...");  // Log pour vérifier si la fonction est appelée
    try {
      res.render('users/create');  // Assurez-vous que le fichier 'create.pug' existe
    } catch (error) {
      console.error("Erreur lors du rendu de la vue :", error);
      res.status(500).send("Erreur interne du serveur");
    }
  };
  

// Fonction pour traiter la soumission du formulaire et créer un utilisateur
const createUser = async (req, res) => {
  try {
    // Récupère les données du formulaire
    const { username, password, avatar, description } = req.body; 
    
    // Crée l'utilisateur dans la base de données
    const user = await User.create({ username, password, avatar, description });
    
    // Une fois l'utilisateur créé, rediriger vers la liste des utilisateurs
    res.redirect('/users');  // Rediriger vers la page des utilisateurs (ou vers la page de l'utilisateur créé)
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
};

// Fonction pour afficher le formulaire d'édition d'un utilisateur
const editUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.render('users/edit', { user }); // Rendu du formulaire d'édition
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user for edit' });
  }
};

// Fonction pour mettre à jour un utilisateur existant.
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);  // Mettre à jour les données de l'utilisateur
    res.json(user);  // Retourner l'utilisateur mis à jour
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Fonction pour supprimer un utilisateur existant.
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();  // Supprimer l'utilisateur
    res.json({ message: 'User deleted successfully' });  // Confirmer la suppression
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  createUserForm,
  updateUser,
  deleteUser,
  editUser
};
