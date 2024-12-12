const Post = require('../models/post');

//get all posts
const getPosts = (req, res, next) => {
    console.log("Test")
    Post.findAll()
        .then(posts => {
            res.status(200).json({ posts: posts });
        })
        .catch(err => console.log(err));
}

//get post by id
const getPost = (req, res, next) => {
    const postId = req.params.id;
    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found!' });
            }
            res.status(200).json({ post: post });
        })
        .catch(err => console.log(err));
}

//create post
const createPost = async (req, res, next) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image
        const tag_id = req.body.tag_id

        await Post.create({
            title: title,
            content: content,
            image: image,
            tag_id: tag_id || null

        })


        console.log('Nouveau post');
        res.status(201).json({
            message: 'Post créé avec succès !',
            post: title
        });
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        res.status(500).json({
            message: 'Erreur lors de la création du post.',
            error: error.message,
        });
    };
};

//update post
const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const updateTitle = req.body.title;
        const updateContent = req.body.content;
        const updateImage = req.body.image
        const updateTag_id = req.body.tag_id

        const postToModify = await Post.findByPk(postId)
        if (!postToModify) {
            return res.status(404).json({ message: 'Post not found!' });
        } else {
            postToModify.title = updateTitle;
            postToModify.content = updateContent;
            postToModify.image = updateImage
            postToModify.tag_id = updateTag_id
            await postToModify.save();
        }
        res.status(200).json({ message: 'Post updated!'});

    } catch (error) {
        console.error('Erreur lors de la modification du post :', error);
        res.status(500).json({
            message: 'Erreur lors de la modification du post.',
            error: error.message,
        });
    };
}

//delete post
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        console.log(postId)
        const postToDelete = await Post.findByPk(postId)
        console.log(postToDelete)
        if (!postToDelete) {
            res.status(400).json({ message: 'Post not found' })
        } else {
            await postToDelete.destroy({
                where: {
                    id: postId,
                },
            });
            res.status(200).json({ message: 'Post deleted' })
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

module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost,
    postForm,
    displayAllPosts
}
