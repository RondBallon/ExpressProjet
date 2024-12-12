// Importation du modèle Sequelize pour les posts
const Post = require('../models/post');

// Récupérer tous les posts
const getPosts = (req, res, next) => {
    console.log("Test"); // Affiche un message dans la console pour vérifier que la fonction est appelée
    Post.findAll() // Récupère tous les posts depuis la base de données
        .then(posts => {
            res.status(200).json({ posts: posts }); // Envoie une réponse JSON avec les posts
        })
        .catch(err => console.log(err)); // Gère les erreurs en les affichant dans la console
};

// Récupérer un post spécifique par ID
const getPost = (req, res, next) => {
    const postId = req.params.id; // Récupère l'ID depuis les paramètres de la requête
    Post.findByPk(postId) // Recherche un post par sa clé primaire (ID)
        .then(post => {
            if (!post) {
                // Si aucun post trouvé, renvoie une erreur 404
                return res.status(404).json({ message: 'Post not found!' });
            }
            res.status(200).json({ post: post }); // Renvoie le post trouvé
        })
        .catch(err => console.log(err)); // Gère les erreurs en les affichant dans la console
};

// Créer un nouveau post
const createPost = async (req, res, next) => {
    try {
        // Récupère les données depuis le corps de la requête
        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image;
        const tag_id = req.body.tag_id;

        // Crée un nouveau post dans la base de données
        await Post.create({
            title: title, // Titre du post
            content: content, // Contenu du post
            image: image, // URL de l'image
            tag_id: tag_id || null, // ID du tag associé (null par défaut si non fourni)
        });

        console.log('Nouveau post'); // Affiche un message dans la console
        res.status(201).json({
            message: 'Post créé avec succès !', // Confirme la création
            post: title, // Retourne le titre du post créé
        });
    } catch (error) {
        console.error('Erreur lors de la création du post :', error); // Log de l'erreur
        res.status(500).json({
            message: 'Erreur lors de la création du post.', // Message d'erreur
            error: error.message, // Détails de l'erreur
        });
    }
};

// Mettre à jour un post existant
const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id; // Récupère l'ID du post à modifier
        const updateTitle = req.body.title; // Nouveau titre
        const updateContent = req.body.content; // Nouveau contenu
        const updateImage = req.body.image; // Nouvelle image
        const updateTag_id = req.body.tag_id; // Nouveau tag associé

        // Recherche le post par ID
        const postToModify = await Post.findByPk(postId);
        if (!postToModify) {
            // Si aucun post trouvé, renvoie une erreur 404
            return res.status(404).json({ message: 'Post not found!' });
        } else {
            // Mise à jour des champs du post
            postToModify.title = updateTitle;
            postToModify.content = updateContent;
            postToModify.image = updateImage;
            postToModify.tag_id = updateTag_id;
            await postToModify.save(); // Sauvegarde les modifications
        }
        res.status(200).json({ message: 'Post updated!' }); // Confirme la mise à jour
    } catch (error) {
        console.error('Erreur lors de la modification du post :', error); // Log de l'erreur
        res.status(500).json({
            message: 'Erreur lors de la modification du post.', // Message d'erreur
            error: error.message, // Détails de l'erreur
        });
    }
};

// Supprimer un post
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id; // Récupère l'ID du post à supprimer
        console.log(postId); // Affiche l'ID dans la console
        const postToDelete = await Post.findByPk(postId); // Recherche le post par ID
        console.log(postToDelete); // Affiche le post trouvé
        if (!postToDelete) {
            res.status(400).json({ message: 'Post not found' }); // Si aucun post trouvé, renvoie une erreur
        } else {
            // Supprime le post trouvé
            await postToDelete.destroy({
                where: {
                    id: postId, // Condition de suppression (ID)
                },
            });
            res.status(200).json({ message: 'Post deleted' }); // Confirme la suppression
        }

    } catch (error) {
        console.error('Erreur lors de la destruction du post :', error);
        res.status(500).json({
            message: 'Erreur lors de la destruction du post.',
            error: error.message,
        });
    };
}

//formulaire de création de post
const postForm = (req, res, next) => {
    res.render('posts/post_form');
    if (!Comments) return res.status(404).send;
};

const displayAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        res.render('posts/homePage', { posts });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers
module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost,
    postForm,
    displayAllPosts
}
