// Importation des modules nécessaires
var createError = require('http-errors'); // Permet de générer des erreurs HTTP personnalisées.
var express = require('express'); // Framework web pour simplifier la création d'applications Node.js.
var path = require('path'); // Fournit des outils pour gérer et manipuler les chemins de fichiers.
var cookieParser = require('cookie-parser'); // Middleware pour analyser les cookies dans les requêtes.
var logger = require('morgan'); // Middleware pour journaliser les requêtes HTTP.

// Importation des routes
var indexRouter = require('./routes/index'); // Route pour la racine (`/`).
var usersRouter = require('./routes/users'); // Route pour `/users`.
var postsRouter = require('./routes/post');

var app = express(); // Création d'une application Express.

// Configuration de Sequelize pour gérer la base de données
const sequelize = require('./sequelize'); // Instance Sequelize configurée pour la base de données.
const User = require('./models/User'); // Exemple d'importation d'un modèle Sequelize représentant une table.
const post = require('./models/post');

// Synchronisation de la base de données via Sequelize
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Synchronise les modèles avec la base de données en modifiant les schémas si nécessaire.
    console.log('Database synchronized successfully.'); // Log en cas de succès.
  } catch (error) {
    console.error('Database synchronization failed:', error); // Log en cas d'échec.
  }
})();

// Configuration du moteur de vue
app.set('views', path.join(__dirname, 'views')); // Définit le répertoire contenant les fichiers de templates.
app.set('view engine', 'jade'); // Définit `jade` (renommé `pug`) comme moteur de templates.

// Configuration des middlewares
app.use(logger('dev')); // Ajoute un journal des requêtes HTTP en mode développement.
app.use(express.json()); // Middleware pour analyser les corps de requêtes JSON.
app.use(express.urlencoded({ extended: false })); // Analyse les données encodées dans les URL (simples objets).
app.use(cookieParser()); // Middleware pour analyser les cookies.
app.use(express.static(path.join(__dirname, 'public'))); // Sert les fichiers statiques du répertoire `public`.

// Déclaration des routes
app.use('/', indexRouter); // Utilise `indexRouter` pour la route racine `/`.
app.use('/users', usersRouter); // Utilise `usersRouter` pour la route `/users`.
app.use('/posts', postsRouter);

// Gestion des erreurs 404
app.use(function(req, res, next) {
  next(createError(404)); // Crée une erreur 404 pour les routes non trouvées et la passe au gestionnaire d'erreurs.
});

// Gestionnaire global d'erreurs
app.use(function(err, req, res, next) {
  res.locals.message = err.message; // Définit un message d'erreur local.
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Affiche l'erreur complète en mode développement uniquement.

  res.status(err.status || 500); // Définit le code d'état HTTP (404, 500, etc.).
  res.render('error'); // Rend une page d'erreur via le moteur de vue.
});

module.exports = app; // Exporte l'application pour être utilisée ailleurs (comme dans `bin/www` pour démarrer le serveur).
