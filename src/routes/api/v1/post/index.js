const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {check } = require('express-validator');
const Post = require('../../../../controller/api/v1/post');
const Comment = require('../../../../controller/api/v1/post/comment');
const validate = require('../../../../middleware/validate');
const authenticateUserToken = require('../../../../middleware/user');

const post = Joi.object()
  .keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

router.post('/', validate(post), authenticateUserToken, Post.createPost);

router.delete('/:id',[
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'),
], authenticateUserToken, Post.deletePost);

router.post('/like/:id',[
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'), 
], authenticateUserToken, Post.addLike);

router.post('/unlike/:id', [ 
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'), 
], authenticateUserToken, Post.removeLike)

router.post('/comment/:id',[ 
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'), 
], authenticateUserToken, Comment.addComment)

router.get('/all_posts', authenticateUserToken, Post.getAllPost)

router.get('/:id',[ 
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'), 
], authenticateUserToken, Post.getPostById);


module.exports = router;
