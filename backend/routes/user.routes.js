const express = require('express');
const router = express.Router();
const { syncUser, getMe } = require('../controllers/user.controller');

router.post('/sync', syncUser);
router.get('/me', getMe);

module.exports = router;
