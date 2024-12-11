<<<<<<< HEAD
const Comments = require("../models/comments"); //Importe le modèle Sequelize pour les commentaires/

//Pour afficher le formulaire de création de commentaires
const editCommentForm = (req, res) => {
  //const comment = Comments.findByPk(req.params.id);
  res.render("comments/create");
  if (!Comments) return res.status(404).send;
};
=======
const Comments = require('../models/comments'); //Importe le modèle Sequelize pour les commentaires/

//Pour afficher le formulaire de création de commentaires
const editCommentForm = ((req, res) => {
  res.render('comments/create');
  //const comment = Comment.findByPk(req.params.id);
  if (!Comments) return res.status(404).send;
  
});

>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)

// Pour créer un nouveau commentaire
const createComment = async (req, res) => {
  try {
    // Récupérer les données du formulaire depuis `req.body`
<<<<<<< HEAD
    const { id, content, user_id, post_id } = req.body;

    // Créer un nouveau commentaire dans la base de données
    const newComment = await Comments.create({
      id: id,
      content: content,
      user_id: user_id || null, // Par défaut null si non fourni
      post_id: post_id || null, // Par défaut null si non fourni
=======
    const { content, user_id, post_id } = req.body;

    // Créer un nouveau commentaire dans la base de données
    const newComment = await Comments.create({
      content:content,
      user_id: user_id || null, // Par défaut null si non fourni
      post_id: post_id || null // Par défaut null si non fourni
      
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
    });

    // Rediriger ou répondre avec une confirmation
    res.status(201).json({
<<<<<<< HEAD
      message: "Commentaire créé avec succès.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error);
    res.status(500).json({
      message: "Erreur lors de la création du commentaire.",
=======
      message: 'Commentaire créé avec succès.',
      comment: newComment,
    });
  } catch (error) {
    console.error('Erreur lors de la création du commentaire :', error);
    res.status(500).json({
      message: 'Erreur lors de la création du commentaire.',
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
      error: error.message,
    });
  }
};
/* const createComment = ((req, res) => {
  const newComment = {
    id: comments.length + 1, 
    content: req.body.content,
    user_id: req.body.user,
    post_id: req.body.user

  }

  comments.push(newComment)
  res.status(201).json(newComment)
}); */

<<<<<<< HEAD
//pour afficher TOUS les commentaires
const getAllComments = async (req, res) => {
  try {
    //on récupère tous les commentaires depuis la base de données
    const comments = await Comments.findAll();
    //console.log(comments);
    //Envoyer les articles au template `comments/index` pour qu'ils soient affichés
    //res.json(comments)
    res.render("comments/listComments", { comments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des articles.");
  }
};

// Pour afficher un commentaire en particulier via son ID
const getComment = async (req, res) => {
  const id = req.params.id;

  const comment = await Comments.findByPk(id);
  //console.log(comment);
  if (!comment) {
    return res.status(404).send("Commentaire introuvable");
    //return console.log(Comments);
  }
  //res.json(comment);
  res.render("comments/oneCommentById", { comment });
};

//Pour MODIFIER un commentaire
/* const updateComment = async (req, res) => {
  const id = req.params.id;
  const index = await Comments.findIndex((comment) => id === id);
=======
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
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
  const updatedComment = {
    id: Comments[index].id,
    content: req.body.content,
    user_id: req.body.user,
<<<<<<< HEAD
    post_id: req.body.post,
  };
  Comments[index] = updatedComment;
  res.render("comment/listComments");
  res.status(200).json("Commentaire mis à jour");
}; */

//Pour afficher le formulaire de modification d'un commentaire
const updateCommentForm = async (req, res) => {
  const CommentToUpdate = await Comments.findByPk(req.params.id);
  res.render("comments/update");
  if (!Comments) return res.status(404).send;
};

const updateComment = async (req, res) => {
  try {
    const id = req.params.id; // Récupérer l'ID du commentaire à modifier
    //console.log(id);
    const { content, user_id, post_id } = req.body;

    // Trouver le commentaire par ID
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    // Mettre à jour le commentaire
    comment.content = content;
    comment.user_id = user_id || comment.user_id;
    comment.post_id = post_id || comment.post_id;
    await comment.save();

    // Rediriger vers la liste des commentaires après la modification
    res.redirect("/comments/listComments");
  } catch (err) {
    console.error("Erreur lors de la mise à jour du commentaire :", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du commentaire." });
  }
};

// Pour SUPPRIMER un commentaire
const deleteComment = async (req, res) => {
  const id = req.params.comment_id;
  const index = await Comments.findIndex((comment) => id === id);
  Comments.splice(index, 1);
  res.status(200).json("Commentaire supprimé");
};
=======
    post_id: req.body.user
  }
  comments[index] = updatedComment
  res.status(200).json('Commentaire mis à jour')
})



// Pour SUPPRIMER un commentaire
const deleteComment = ((req, res) => {
  const id = Number(req.params.comment_id)
  const index = Comments.findIndex(comment => comment_id === id)
  Comments.splice(index,1)
  res.status(200).json('Commentaire supprimé')
  
})


>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)

module.exports = {
  editCommentForm,
  createComment,
  getAllComments,
  getComment,
<<<<<<< HEAD
  updateCommentForm,
  updateComment,
  deleteComment,
};
=======
  updateComment,
  deleteComment
}
>>>>>>> 2dbc3e6 (formulaire pour créer en commentaire ok + afficher tous les commentaires sur une vue manque la possibilité de modifier et supprimer un commentaire)
