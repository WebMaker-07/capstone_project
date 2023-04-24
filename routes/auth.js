const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/auth_account');
const product_cat = require('../controller/auth_product_category');

router.get('/customers',admin_controller.viewCustomer);

router.get('/update/:customer_id', admin_controller.update);

router.post('/updateCustomer', admin_controller.updateCustomer);


//PRODUCT CATEGORY
router.get('/product-categories',product_cat.viewProductCat);
router.post('/add_category',product_cat.addProductcat);
router.delete('/delete_category/:category_id', product_cat.deleteProductCat);
module.exports = router;
