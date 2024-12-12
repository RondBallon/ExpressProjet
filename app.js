// Importation des modules nécessaires pour l'application
var express = require("express"); // Framework web minimaliste pour Node.js
var path = require("path"); // Module Node.js pour travailler avec les chemins de fichiers/dossiers
var cookieParser = require("cookie-parser"); // Middleware pour analyser les cookies
var logger = require("morgan"); // Middleware pour journaliser les requêtes HTTP
var createError = require("http-errors"); // Gestionnaire d'erreurs pour créer des erreurs HTTP

// Créer l'application Express
var app = express(); // Initialisation d'une instance de l'application Express

// Importation des routes
var indexRouter = require("./routes/index"); // Route pour gérer la racine (`/`)
var usersRouter = require("./routes/users/users"); // Route pour gérer les utilisateurs (`/users`)
var postsRouter = require("./routes/posts"); // Route pour gérer les publications (`/posts`)
var authRouter = require('./routes/auth/auth'); // Route pour gérer l'authentification (`/auth`)
var commentsRouter = require("./routes/comments"); // Route pour gérer les commentaires (`/comments`)

// Ajouter les middlewares nécessaires
app.use(express.urlencoded({ extended: true })); // Middleware pour analyser les formulaires (POST, PUT, DELETE)
app.use(express.json()); // Middleware pour analyser les requêtes avec des corps JSON
app.use(cookieParser()); // Middleware pour analyser les cookies des requêtes
app.use(express.static(path.join(__dirname, "public"))); // Sert les fichiers statiques (CSS, JS, images) depuis le dossier `public`
app.use(logger("dev")); // Ajoute un journal des requêtes HTTP (mode développement)

// Configuration de Sequelize pour la base de données
const sequelize = require("./sequelize"); // Import de l'instance Sequelize configurée
const User = require("./models/User"); // Import du modèle représentant la table `User`
const Post = require("./models/post"); // Import du modèle représentant la table `Post`
const Comment = require("./models/comments"); // Import du modèle représentant la table `Comment`

// Configuration de l'application Express
app.set("views", path.join(__dirname, "views")); // Définit le répertoire où sont stockées les vues/templates
app.set("view engine", "pug"); // Définit le moteur de template à utiliser (Pug)

// Configuration des middlewares globaux
app.use(logger("dev")); // Ajoute un journal des requêtes HTTP en mode développement
app.use(express.json()); // Middleware pour analyser les requêtes JSON
app.use(express.urlencoded({ extended: false })); // Middleware pour analyser les données encodées dans les URL
app.use(cookieParser()); // Middleware pour analyser les cookies
app.use(express.static(path.join(__dirname, "public"))); // Sert les fichiers statiques

// Déclaration des routes
app.use("/", indexRouter); // Utilise `indexRouter` pour la route racine (`/`)
app.use("/users", usersRouter); // Utilise `usersRouter` pour gérer `/users`
app.use("/posts", postsRouter); // Utilise `postsRouter` pour gérer `/posts`
app.use('/auth', authRouter); // Utilise `authRouter` pour gérer `/auth`
app.use("/comments", commentsRouter); // Utilise `commentsRouter` pour gérer `/comments`

// Middleware pour gérer les erreurs 404 (ressource non trouvée)
app.use(function (req, res, next) {
  next(createError(404)); // Passe une erreur 404 au middleware suivant
});

// Middleware pour gérer les erreurs globales
app.use(function (err, req, res, next) {
  res.locals.message = err.message; // Ajoute le message d'erreur dans les variables locales
  res.locals.error = req.app.get("env") === "development" ? err : {}; // Affiche l'erreur complète uniquement en mode dev

  // Renvoie une réponse avec le statut d'erreur et rend une vue d'erreur
  res.status(err.status || 500); // Définit le code HTTP de la réponse
  res.render("error"); // Rend le fichier `views/error.pug` pour afficher l'erreur
});

// Exportation de l'application Express pour être utilisée ailleurs
module.exports = app; // Permet d'importer cette application dans d'autres fichiers
