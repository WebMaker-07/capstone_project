const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');

router.get('/customers',admin_controller.viewCustomer);
router.post('/addCustomer', admin_controller.addCustomer);

module.exports = router;