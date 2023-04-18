const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');

router.post('/customers',admin_controller.viewCustomer);

module.exports = router;