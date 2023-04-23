let express = require('express');
const router = express.Router();

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
    router.get('/product-categories',(request,response)=>{
        response.render('admin/product_category');
    })


module.exports = router;