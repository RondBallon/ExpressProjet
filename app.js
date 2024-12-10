var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

// Créer l'application Express
var app = express();

// Ajouter le middleware express.urlencoded et autres après la création de l'app
app.use(express.urlencoded({ extended: true })); // Si tu veux aussi traiter les formulaires avec des méthodes PUT et DELETE
app.use(express.json());  // Analyser les corps de requêtes JSON
app.use(cookieParser());  // Analyser les cookies dans les requêtes
app.use(express.static(path.join(__dirname, 'public')));  // Servir les fichiers statiques (si nécessaires)
app.use(logger('dev'));  // Journaliser les requêtes HTTP

// Importer les routes
var userRouter = require('./routes/users/users');  // Nous utilisons maintenant la route qui gère les utilisateurs
var indexRouter = require('./routes/index');  // La route pour la page d'accueil (index)

// Configuration de l'application
app.set('views', path.join(__dirname, 'views'));  // Définit le répertoire pour les vues (templates)
app.set('view engine', 'pug');  // Définit le moteur de vues (Pug ici)

// Routes
app.use('/', indexRouter);  // La route pour la page d'accueil
app.use('/users', userRouter);  // Gérer les utilisateurs avec le fichier `users.js` (ta route des utilisateurs)

// Gestion des erreurs
// Si aucune route n'est trouvée (erreur 404)
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestion des erreurs globales
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // Réponse avec un statut d'erreur et la page d'erreur correspondante
  res.status(err.status || 500);
  res.render('error');  // Affiche une page d'erreur (fichier `views/error.pug` si nécessaire)
});

module.exports = app;

