const express = require('express');
const router = express.Router();

// Importing appropriate controllers
var MainController = require('../Controllers/Main');

router.get('/', MainController.test);
router.post('/users/authenticate', MainController.authenticateUser);

module.exports = router;