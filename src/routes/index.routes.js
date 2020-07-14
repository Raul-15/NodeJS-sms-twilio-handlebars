const { Router } = require('express');
const router = Router();



const { indexController, postMessage, receiveMessage } = require('../controllers/index.controller')
    // Main page
router.get('/', indexController);

//Send an sms
router.post('/send-sms', postMessage);

//Receive an sms 
router.post('/sms', receiveMessage);

module.exports = router;