// Importation du modèle Sequelize pour les commentaires
const Comments = require("../models/comments");

// Affiche le formulaire de création de commentaires
const editCommentForm = (req, res) => {
  res.render("comments/create"); // Rend la vue `create` pour créer un commentaire
  if (!Comments) return res.status(404).send; // Si le modèle `Comments` est introuvable, renvoie une erreur 404
};

// Création d'un nouveau commentaire
const createComment = async (req, res) => {
  try {
    // Récupération des données du formulaire via `req.body`
    const { id, content, user_id, post_id } = req.body;

    // Création d'un nouveau commentaire dans la base de données
    const newComment = await Comments.create({
      id: id, // ID du commentaire
      content: content, // Contenu du commentaire
      user_id: user_id || null, // ID de l'utilisateur (par défaut null si non fourni)
      post_id: post_id || null, // ID du post associé (par défaut null si non fourni)
    });

    // Réponse avec un statut 201 et confirmation de création
    res.status(201).json({
      message: "Commentaire créé avec succès.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error); // Log de l'erreur
    res.status(500).json({
      message: "Erreur lors de la création du commentaire.", // Message d'erreur
      error: error.message,
    });
  }
};

// Affiche tous les commentaires
const getAllComments = async (req, res) => {
  try {
    // Récupération de tous les commentaires depuis la base de données
    const comments = await Comments.findAll();

    // Rend la vue `listComments` avec les données des commentaires
    res.render("comments/listComments", { comments });
  } catch (err) {
    console.error(err); // Log de l'erreur en cas d'échec
    res.status(500).send("Erreur lors de la récupération des commentaires."); // Réponse d'erreur
  }
};

// Affiche un commentaire spécifique via son ID
const getComment = async (req, res) => {
  const id = req.params.id; // Récupère l'ID depuis les paramètres de la requête

  // Trouve un commentaire par son ID
  const comment = await Comments.findByPk(id);

  if (!comment) {
    return res.status(404).send("Commentaire introuvable"); // Renvoie une erreur 404 si non trouvé
  }

  // Rend la vue `oneCommentById` avec les détails du commentaire
  res.render("comments/oneCommentById", { comment });
};

// Affiche le formulaire pour modifier un commentaire
//Pour MODIFIER un commentaire
/* const updateComment = async (req, res) => {
  const id = req.params.id;
  const index = await Comments.findIndex((comment) => id === id);
//pour afficher TOUS les commentaires 
const getAllComments = async(req, res) => {
   
  try{
    //on récupère tous les commentaires depuis la base de données
    const comments =await Comments.findAll();
    //console.log(comments);
    //Envoyer les articles au template `comments/index` pour qu'ils soient affichés 
    //res.json(comments)
    res.render('comments/listComments', {comments});

  }catch (err){
    console.error(err);
    res.status(500).send('Erreur lors de la récupération des articles.');
  }
}

// Pour afficher un commentaire en particulier via son ID

const getComment = ((req, res) => {
  const id = Number(req.params.comment_id)
  const comment = Comments.find(comment => comment_id === id)
    if(!comment){
      return res.status(404).send('Commentaire introuvable')
    }
    res.json(comment)
})

//Pour MODIFIER un commentaire
const updateComment = ((req, res) =>{
  const id = Number(req.params.comment_id)
  const index = Comments.findIndex(comment => comment_id === id)
  const updatedComment = {
    id: Comments[index].id,
    content: req.body.content,
    user_id: req.body.user,
    post_id: req.body.post,
  };
  Comments[index] = updatedComment;
  res.render("comment/listComments");
  res.status(200).json("Commentaire mis à jour");
}; */

//Pour afficher le formulaire de modification d'un commentaire
const updateCommentForm = async (req, res) => {
  const CommentToUpdate = await Comments.findByPk(req.params.id); // Trouve le commentaire par ID
  res.render("comments/update"); // Rend la vue `update` pour modification
  if (!Comments) return res.status(404).send; // Si le modèle `Comments` est introuvable, renvoie une erreur 404
};

// Met à jour un commentaire
const updateComment = async (req, res) => {
  try {
    const id = req.params.id; // Récupère l'ID du commentaire à modifier
    const { content, user_id, post_id } = req.body; // Récupère les données à mettre à jour

    // Trouve le commentaire par ID
    const comment = await Comments.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" }); // Erreur 404 si le commentaire n'existe pas
    }

    // Met à jour les champs du commentaire
    comment.content = content; // Met à jour le contenu
    comment.user_id = user_id || comment.user_id; // Met à jour l'ID utilisateur si fourni
    comment.post_id = post_id || comment.post_id; // Met à jour l'ID du post si fourni
    await comment.save(); // Sauvegarde les modifications dans la base de données

    // Redirige vers la liste des commentaires après mise à jour
    res.redirect("/comments/listComments");
  } catch (err) {
    console.error("Erreur lors de la mise à jour du commentaire :", err); // Log de l'erreur
    res.status(500).json({
      message: "Erreur lors de la mise à jour du commentaire.", // Message d'erreur
    });
  }
};

// Supprime un commentaire
const deleteComment = async (req, res) => {
  const id = req.params.comment_id; // Récupère l'ID du commentaire à supprimer
  const index = await Comments.findIndex((comment) => id === id); // Trouve l'index du commentaire dans la base
  Comments.splice(index, 1); // Supprime le commentaire de la liste
  res.status(200).json("Commentaire supprimé"); // Confirme la suppression
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers
module.exports = {
  editCommentForm, // Formulaire de création de commentaire
  createComment, // Création d'un commentaire
  getAllComments, // Récupération de tous les commentaires
  getComment, // Récupération d'un commentaire spécifique
  updateCommentForm, // Formulaire pour modifier un commentaire
  updateComment, // Mise à jour d'un commentaire
  deleteComment, // Suppression d'un commentaire
};

