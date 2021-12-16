const express = require('express');
const router = express.Router();

// Importing appropriate controllers
var MainController = require('../Controllers/Main');

router.get('/', MainController.test);
router.post('/users/authenticate', MainController.authenticateUser);
router.post('/users/register', MainController.registerUser);
router.get('/users', MainController.getUsers);
router.get('/users/:id', MainController.getUserById);

module.exports = router;