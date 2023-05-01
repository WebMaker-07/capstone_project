const express = require('express');
const router = express.Router();
const product_cat = require('../controller/auth_product_category');
const admin_controller = require('../controller/auth_account');
const product_list = require('../controller/auth_product_list');


//CUSTOMERS
router.get('/customers',admin_controller.view_customer);
router.post('/add_customer',admin_controller.add_customer);
router.get('/customer_update/:customer_id', admin_controller.update_form);
router.post('/update_customer', admin_controller.update_customer);
router.get('/customer_delete/:customer_id', admin_controller.customer_delete);

//PRODUCT CATEGORY
router.get('/product-categories',product_cat.viewProductCat);
router.post('/add_category',product_cat.addProductcat);
router.get('/deleteProductCat/:category_id', product_cat.deleteProductCat);
router.get('/auth/updateProductCat/:category_id', product_cat.updateProductCat);
router.post('/auth/updateProductCat/:category_id', product_cat.updateProductCatSubmit);

//PRODUCT LIST
router.get('/product-list',product_list.viewProductList);
router.post('/product_add',product_list.addProductList);
router.get('/deleteProduct/:product_id',product_list.deleteProductList);

module.exports = router;
