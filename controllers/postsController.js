const post = require ('../models/post')


//get all posts
exports.getPosts = (req, res, next) => {
    posts.findAll()
        .then(posts => {
            res.status(200).json({ posts: posts });
        })
        .catch(err => console.log(err));
}

//get post by id
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    post.findByPk(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found!' });
            }
            res.status(200).json({ post: post });
        })
        .catch(err => console.log(err));
}

//create post
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image
  const tag_id = req.body.tag_id
  post.create({
    title: title,
    content: content,
    image: image,
    tag_id: tag_id

  })
    .then(result => {
      console.log('Created post');
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

//update post
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const updateTitle = req.body.title;
  const updateContent = req.body.content;
  const updateImage = req.body.image
  const updateTag_id = req.body.tag_id
  Post.findByPk(postId)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found!' });
      }
      post.title = updateTitle;
      post.content = updateContent;
      post.image = updateImage
      post.tag_id = updateTag_id
      return post.save();
    })
    .then(result => {
      res.status(200).json({message: 'Post updated!', post: result});
    })
    .catch(err => console.log(err));
}

//delete post
exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  post.findByPk(postId)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found!' });
      }
      return post.destroy({
        where: {
          id: postId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Post deleted!' });
    })
    .catch(err => console.log(err));
}
