const express = require('express');
const router = express.Router();
const validatorController = require('../controllers/validatorController');

//Base Page
router.get('/home', validatorController.home);

//Create User
router.get('/signup', validatorController.register);
router.post('/signup', validatorController.signup);

//Look up user
router.get('/lookup', validatorController.lookuppage);
router.post('/lookup', validatorController.lookup);

//Look up and edit user
router.get('/editdetails', validatorController.editg);
router.post('/editdetails', validatorController.editp);

//Look up and delete user
router.get('/delete', validatorController.deleteg);
router.post('/delete', validatorController.deletep);

//Export
module.exports = router;