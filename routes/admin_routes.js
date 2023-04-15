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

module.exports = router;