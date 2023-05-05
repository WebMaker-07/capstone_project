const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });

    exports.viewuser = (req,res) =>{
        const { store_name, user_name, main_admin_firstname, main_admin_lastname, user_password, user_email,  } = req.body;
        db.query('SELECT * from stores',
        (error,result)=>
        {
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('login_admin',
                {
                    data: result,
                });
            }
            
        });
    }

    //login for store_account
    exports.store_login = (req,res)=> {
        const {user_email, user_password} = req.body;
        if(user_email == "" || user_password == "")
            {
                res.render('login_admin',
                    {
                        message:'Fields are empty, Please try again!',
                        color:"alert-danger"
                    });
            }
        db.query('SELECT * FROM stores WHERE user_email = ?',user_email,
            (err,result)=>
                {
                    if(!result[0])
                        {
                            res.render('login_admin',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else if(result[0].user_password != user_password)
                        {
                            res.render('login_admin',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else
                        {
                            res.render('admin/home',
                                {
                                    user:result[0]
                                });
                        }
                });
    }