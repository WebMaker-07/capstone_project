const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');
const product_cat = require('../controller/auth_product_category');

router.get('/customers',admin_controller.view_customer);

router.post('/add_customer',admin_controller.add_customer);

router.get('/customer_update/:customer_id', admin_controller.update_form);

router.post('/update_customer', admin_controller.update_customer);

router.get('/customer_delete/:customer_id', admin_controller.customer_delete);

module.exports = router;
