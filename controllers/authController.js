// Importation du modèle `User` pour interagir avec la base de données
const User = require('../models/User');

// Rendu de la page de connexion
const getLogin = (req, res) => {
  res.render('auth/login', { // Affiche la vue `login` dans le répertoire `auth`
    title: 'Login', // Titre de la page
    error: null // Aucun message d'erreur initialement
  });
};

// Gestion de la connexion
const login = async (req, res) => {
  const { username, password } = req.body; // Récupère le nom d'utilisateur et le mot de passe depuis le corps de la requête

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({
      where: { 
        username: username, // Condition : correspondance du nom d'utilisateur
        password: password  // Condition : correspondance du mot de passe
      },
      attributes: { exclude: ['password'] } // Exclut le mot de passe des attributs renvoyés
    });

    // Si l'utilisateur n'existe pas, renvoyer un message d'erreur
    if (!user) {
      return res.render('auth/login', { // Réaffiche la page `login` avec un message d'erreur
        title: 'Login',
        error: 'Identifiants incorrects. Réessayez.' // Message d'erreur affiché à l'utilisateur
      });
    }

    // Si la connexion réussit, redirige vers la page d'accueil
    res.redirect('/');

  } catch (error) {
    // En cas d'erreur lors de la connexion
    console.error('Login error:', error); // Affiche l'erreur dans la console pour le débogage
    res.render('auth/login', { // Réaffiche la page `login` avec un message d'erreur générique
      title: 'Login',
      error: 'Une erreur est survenue. Réessayez.' // Message d'erreur affiché à l'utilisateur
    });
  }
};

// Rendu de la page de déconnexion
const getLogout = (req, res) => {
  res.render('auth/logout', { // Affiche la vue `logout` dans le répertoire `auth`
    title: 'Logout' // Titre de la page
  });
};

// Gestion de la déconnexion
const logout = (req, res) => {
  // Vérifie si une session utilisateur existe
  if (req.session) {
    req.session.destroy((err) => { // Détruit la session en cours
      if (err) {
        console.error('Logout error:', err); // Affiche l'erreur dans la console si la destruction échoue
      }
      
      // Redirige vers la page d'accueil après la déconnexion
      res.redirect('/');
    });
  } else {
    // Si aucune session n'existe, redirige directement vers la page d'accueil
    res.redirect('/');
  }
};

// Exportation des fonctions pour les rendre accessibles dans d'autres fichiers
module.exports = {
  getLogin, // Fonction pour afficher la page de connexion
  login,    // Fonction pour gérer la soumission du formulaire de connexion
  getLogout, // Fonction pour afficher la page de déconnexion
  logout    // Fonction pour gérer la déconnexion de l'utilisateur
};
