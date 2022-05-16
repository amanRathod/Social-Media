/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Auth = require('../../../../controller/api/v1/auth');
const ratelimiter = require('../../../../../rate-limiter');
const validate = require('../../../../middleware/validate');
const authenticateUserToken = require('../../../../middleware/user');

const userLogin = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

router.post('/login', validate(userLogin), ratelimiter({ secondsWindow: 10, allowedHits: 4 }), Auth.login);

router.get('/logout', authenticateUserToken, Auth.logout);

module.exports = router;
