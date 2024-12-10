const Comments = require("../models/comments"); //Importe le modèle Sequelize pour les commentaires/

//Pour afficher le formulaire de création de commentaires
const editCommentForm = (req, res) => {
  //const comment = Comments.findByPk(req.params.id);
  res.render("comments/create");
  if (!Comments) return res.status(404).send;
};

// Pour créer un nouveau commentaire
const createComment = async (req, res) => {
  try {
    // Récupérer les données du formulaire depuis `req.body`
    const { content, user_id, post_id } = req.body;

    // Créer un nouveau commentaire dans la base de données
    const newComment = await Comments.create({
      content:content,
      user_id: user_id || null, // Par défaut null si non fourni
      post_id: post_id || null // Par défaut null si non fourni
      
    });

    // Rediriger ou répondre avec une confirmation
    res.status(201).json({
      message: "Commentaire créé avec succès.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error);
    res.status(500).json({
      message: "Erreur lors de la création du commentaire.",
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
  const index = await Comments.findIndex((comment) => id === id); */
//pour afficher TOUS les commentaires 
// const getAllComments = async(req, res) => {
   
//   try{
//     //on récupère tous les commentaires depuis la base de données
//     const comments =await Comments.findAll();
//     //console.log(comments);
//     //Envoyer les articles au template `comments/index` pour qu'ils soient affichés 
//     //res.json(comments)
//     res.render('comments/listComments', {comments});

//   }catch (err){
//     console.error(err);
//     res.status(500).send('Erreur lors de la récupération des articles.');
//   }
// }

// Pour afficher un commentaire en particulier via son ID

// const getComment = ((req, res) => {
//   const id = Number(req.params.comment_id)
//   const comment = Comments.find(comment => comment_id === id)
//     if(!comment){
//       return res.status(404).send('Commentaire introuvable')
//     }
//     res.json(comment)
// })

//Pour MODIFIER un commentaire
const updateComment = ((req, res) =>{
  const id = Number(req.params.comment_id)
  const index = Comments.findIndex(comment => comment_id === id)
  const updatedComment = {
    id: Comments[index].id,
    content: req.body.content,
    user_id: req.body.user,
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



module.exports = {
  editCommentForm,
  createComment,
  getAllComments,
  getComment,
  updateCommentForm,
  updateComment,
  deleteComment,
};
