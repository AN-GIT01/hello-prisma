const express = require('express');
const router = express.Router();
// const  { handleCreateUser, handleRemoveUser } = require('../controllers/userController');
const  userController = require('../controllers/userController');

router.route('/')
    .post(userController.handleCreateUser)
    .delete(userController.handleRemoveUser)

router.route('/:id')
    .get(userController.handleGetUserById)

module.exports = router