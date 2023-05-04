const express = require('express');
const router = express.Router();
const product_cat = require('../controller/auth_product_category');
const admin_controller = require('../controller/auth_account');
const product_list = require('../controller/auth_product_list');
const register = require('../controller/auth_admin_register');
const login = require('../controller/auth_login');
const product = require('../controller/auth_product');

//CUSTOMERS
router.get('/customers',admin_controller.view_customer);
router.post('/add_customer',admin_controller.add_customer);
router.get('/customer_update/:customer_id', admin_controller.update_form);
router.post('/update_customer', admin_controller.update_customer);
router.get('/customer_delete/:customer_id', admin_controller.customer_delete);
router.post('/search_customer', admin_controller.search_customer);

//PRODUCT CATEGORY
router.get('/product-categories',product_cat.viewProductCat);
router.post('/product-categories',product_cat.addProductcat);
router.get('/deleteProductCat/:category_id', product_cat.deleteProductCat);
router.post('/update_category', product_cat.updateCategory);

//PRODUCT LIST
router.get('/product-list',product_list.viewProductList);
router.post('/product_add',product_list.addProductList);
router.get('/product_update/:product_id',product_list.updateProductForm);
router.post('/update_product',product_list.updateProduct);
router.get('/deleteProduct/:product_id',product_list.deleteProductList);
router.post('/search_product',product_list.searchProduct);

//REGISTER
router.get('/register_admins',register.viewuser);
router.post('/register_admin',register.adduser);

//login
router.get('/login_admin',login.viewuser);
// router.post('/login_admin',login.loginCheck);

//PRODUCT
// router.get('product-list',product_cat.viewProduct);
// router.post('/add_product',product_cat.addProduct);
// router.post('/search_product', admin_controller.searchProduct);

//STOCK METHOD
//  router.get('/product-stock-in', product.viewStockList);
module.exports = router;
