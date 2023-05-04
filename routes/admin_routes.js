let express = require('express');
const router = express.Router();
const product = require('../controller/auth_product');

router.get('/',(request,response)=>{
    response.render('index');
})
router.get('/login_admin',(request,response)=>{
    response.render('login_admin');
})
router.get('/register_admin',(request,response)=>{
    response.render('register_admin');
})

// routes in admin dashboards
router.get('/dashboard',(request,response)=>{
    response.render('admin/home');
})
    // routes for customer function
    router.get('/customers',(request,response)=>{
        response.render('admin/customers');
    })
    router.get('/customer_add',(request,response)=>{
        response.render('admin/customer_add');
    })
    router.get('/customer_update',(request,response)=>{
        response.render('admin/customer_update');
    })
    // routes for customer function

    // Routes for the product
    router.get('/product-list',(request,response)=>{
        response.render('admin/product_list');
    })
    router.get('/product_add',(request,response)=>{
        response.render('admin/product_add');
    })
    router.get('/product_update',(request,response)=>{
        response.render('admin/product_update');
    })
    //PRODUCT CATEGORY
    router.get('/product-categories',(request,response)=>{
        response.render('admin/product_category');
    })
    router.post('/product-categories',(request,response)=>{
        response.render('admin/product_category');
    })

    router.get('/customer_login',(request,response)=>{
        response.render('customer/customer_login');
    })
    router.get('/index',(request,response)=>{
        response.render('customer/home');
    })


    //STOCK ROUTES
    router.get('/add_stock',(request,response)=>{
        response.render('admin/stock_in_add');
    })
     //STOCK METHOD
     router.get('/product-stock-in', product.viewStockList);
     router.post('/search_product', product.seacrhProduct);
     router.post('/process_stock', product.processStock);

     //CUSTOMER DASHBOARD
     router.get('/store1/index',(request,response)=>{
        response.render('customer/home');
    })
    
    


module.exports = router;