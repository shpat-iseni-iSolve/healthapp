const express = require('express');
const router = express.Router();

// Importing appropriate controllers
var MainController = require('../Controllers/Main');

// test
router.get('/', MainController.test);

// users
router.post('/users/authenticate', MainController.authenticateUser);
router.post('/users/register', MainController.registerUser);

router.get('/users', MainController.getUsers);
router.get('/users/:id', MainController.getUserById);

router.put('/users/:id', MainController.updateUserById);
router.delete('/users/:id', MainController.deleteUserById);

// lab
router.get('/lab/appointments', MainController.getAppointments);
router.get('/lab/register', MainController.registerLab);


// other
router.get('/getdrugs', MainController.getDrugs);


module.exports = router;