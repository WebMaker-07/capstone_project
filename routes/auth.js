const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');
const product_cat = require('../controller/auth_product_category');

router.get('/customers',admin_controller.viewCustomer);
router.get('/product',product_cat.viewProductCat);

router.get('/update/:customer_id', admin_controller.update);

router.post('/updateCustomer', admin_controller.updateCustomer);

module.exports = router;
