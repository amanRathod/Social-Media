const express = require('express');
const router = express.Router();
const {check } = require('express-validator');
const User = require('../../../../controller/api/v1/user'); 
const authenticateUserToken = require('../../../../middleware/user');

router.post('/follow/:id', [
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'),
], authenticateUserToken, User.addFollower);

router.post('/unfollow/:id', [
  check('id').isMongoId().trim().notEmpty().withMessage('id is required'),
], authenticateUserToken, User.removeFollower);

router.get('/', authenticateUserToken, User.getUserProfile);

module.exports = router;
