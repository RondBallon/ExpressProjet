'use strict'; 
// Mode strict activé, ce qui rend le JavaScript plus rigoureux et empêche certains comportements indésirables, comme l'utilisation de variables non définies.

const { Model } = require('sequelize'); 
// On importe la classe `Model` de Sequelize. Cette classe est la base pour tous les modèles dans Sequelize. Chaque modèle, comme ici le modèle `Post`, héritera de cette classe pour interagir avec la base de données.

module.exports = (sequelize, DataTypes) => { 
  // On exporte une fonction anonyme qui prend deux paramètres : `sequelize` et `DataTypes`.
  // `sequelize` est l'instance de la connexion à la base de données et `DataTypes` est un objet contenant les types de données disponibles qu'on peut utiliser pour définir nos attributs de modèle.

  class Post extends Model { 
    // On définit la classe `Post`, qui étend la classe `Model` de Sequelize.
    // Cela permet à la classe `Post` de bénéficier de toutes les méthodes de Sequelize pour interagir avec la base de données.

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Cette section de commentaire explique que la méthode `associate` est utilisée pour définir des associations entre le modèle `Post` et d'autres modèles.
    // Elle n'est pas appelée directement lors de la création du modèle, mais est invoquée automatiquement par Sequelize dans le fichier `models/index.js`.

    static associate(models) {
      // La méthode `associate` est statique et permet de définir les relations entre `Post` et d'autres modèles (comme `User`, `Tag`, etc.).
      // À ce stade, cette méthode est vide car aucune association n'a été définie pour ce modèle. Elle pourrait être utilisée pour associer `Post` à un `User`, par exemple.

    }
    // Fin de la méthode `associate`.
  } 
  // Fin de la définition de la classe `Post`.

  // La méthode `init` de `Post` serait ensuite utilisée pour définir les attributs du modèle (qui ne sont pas présents ici, mais ils seront ajoutés ailleurs dans le fichier ou le code).

  Post.init({
    // Cette méthode sert à initialiser le modèle en définissant les attributs et les types de données de la table qui sera créée en base de données.
    user_id: DataTypes.INTEGER,  // L'attribut `user_id` est défini comme un type INTEGER pour représenter l'ID de l'utilisateur.
    title: DataTypes.STRING,  // L'attribut `title` est défini comme une chaîne de caractères (STRING).
    content: DataTypes.TEXT,  // L'attribut `content` est défini comme un champ de texte (TEXT).
    image: DataTypes.TEXT,  // L'attribut `image` est aussi défini comme un champ de texte pour stocker des liens d'images ou des descriptions.
    tag_id: DataTypes.INTEGER  // L'attribut `tag_id` est défini comme un INTEGER, probablement une clé étrangère pointant vers une table de tags.
  }, {
    sequelize,  // L'instance Sequelize utilisée pour connecter ce modèle à la base de données.
    modelName: 'Post',  // Le nom du modèle. Ici, il s'appelle `Post`.
  });

  return Post; 
  // Enfin, on retourne le modèle `Post` créé, de sorte qu'il soit accessible ailleurs dans l'application.
};
