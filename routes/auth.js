const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');

router.post('/customers', (req, res) => {
  console.log('viewCustomer is called');
  admin_controller.viewCustomer(req, res);
});

module.exports = router;
