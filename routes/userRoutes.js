const express = require('express');
const UserHandler = require('../handler/userHandler');
const Authentication = require('../middleware/authentication')
const Authorization = require('../middleware/authorization')
const router = express.Router();

router.post('/createuser', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.createNewUser);
router.post('/createadmin', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.createAdmin);
router.post('/deleteuser', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.deleteUser);


module.exports = router;
