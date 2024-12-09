var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");

// Créer l'application Express
var app = express();
// Importation des routes
var indexRouter = require("./routes/index"); // Route pour la racine (`/`).
var userRouter = require("./routes/users/users"); // Nous utilisons maintenant la route qui gère les utilisateurs
var postsRouter = require("./routes/posts"); // Route pour `/posts`.

// Ajouter le middleware express.urlencoded et autres après la création de l'app
app.use(express.urlencoded({ extended: true })); // Si tu veux aussi traiter les formulaires avec des méthodes PUT et DELETE
app.use(express.json()); // Analyser les corps de requêtes JSON
app.use(cookieParser()); // Analyser les cookies dans les requêtes
app.use(express.static(path.join(__dirname, "public"))); // Servir les fichiers statiques (si nécessaires)
app.use(logger("dev")); // Journaliser les requêtes HTTP
var commentsRouter = require("./routes/comments"); //Route pour `/comments`.

var app = express(); // Création d'une application Express.

// Configuration de Sequelize pour gérer la base de données
const sequelize = require("./sequelize"); // Instance Sequelize configurée pour la base de données.
const User = require("./models/User"); // Exemple d'importation d'un modèle Sequelize représentant une table.
const Post = require("./models/post");

// Configuration de l'application
app.set("views", path.join(__dirname, "views")); // Définit le répertoire pour les vues (templates)
app.set("view engine", "pug"); // Définit le moteur de vues (Pug ici)

// Configuration des middlewares
app.use(logger("dev")); // Ajoute un journal des requêtes HTTP en mode développement.
app.use(express.json()); // Middleware pour analyser les corps de requêtes JSON.
app.use(express.urlencoded({ extended: false })); // Analyse les données encodées dans les URL (simples objets).
app.use(cookieParser()); // Middleware pour analyser les cookies.
app.use(express.static(path.join(__dirname, "public"))); // Sert les fichiers statiques du répertoire `public`.

// Déclaration des routes
app.use("/", indexRouter); // Utilise `indexRouter` pour la route racine `/`.
app.use("/users", usersRouter); // Utilise `usersRouter` pour la route `/users`.
app.use("/posts", postsRouter);

app.use("/comments", commentsRouter); //Utilise `commentsRouter`pour la route `/comments`

// Gestion des erreurs 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Gestion des erreurs globales
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Réponse avec un statut d'erreur et la page d'erreur correspondante
  res.status(err.status || 500);
  res.render("error"); // Affiche une page d'erreur (fichier `views/error.pug` si nécessaire)
});

module.exports = app;
