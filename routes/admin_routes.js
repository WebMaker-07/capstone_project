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
router.get('/customers',(request,response)=>{
    response.render('admin/customers');
})
router.get('/product-list',(request,response)=>{
    response.render('admin/product_list');
})
router.get('/product_categories',(request,response)=>{
    response.render('admin/product_category');
})


module.exports = router;
