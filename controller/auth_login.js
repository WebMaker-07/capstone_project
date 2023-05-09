const encrypt = require('bcrypt');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
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
            async (err,result)=>
                {
                    if(!result[0])
                        {
                            res.render('login_admin',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else if (!(await encrypt.compare(user_password,result[0].user_password)))
                        {
                            res.render('login_admin',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else
                        {
                            db.query('SELECT COUNT(*) as count FROM customers',(err,output)=>
                                {
                                    console.log(output);
                                    if(err)
                                        {
                                            console.log('Error message: '+err)
                                        }
                                    else
                                        {
                                            
                                            res.render('admin/home',
                                            {
                                                data:output,
                                                user:result[0],
                                            });
                                        }
                                });
                        }
                });
    }

    //customer_login
    exports.customer_login = (req,res)=> {
        const {email, password} = req.body;
        if(email == "" || password == "")
            {
                res.render('customer/customer_login',
                    {
                        message:'Fields are empty, Please try again!',
                        color:"alert-danger"
                    });
            }
        db.query('SELECT * FROM customers WHERE email = ?',email,
            async (err,result)=>
                {
                    if(!result[0])
                        {
                            res.render('customer/customer_login',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else if (!(await encrypt.compare(password,result[0].password)))
                        {
                            res.render('customer/customer_login',
                                {
                                    message:'Invalid credentials, Please try again!',
                                    color:"alert-danger"
                                });
                        }
                    else
                        {
                            res.render('customer/home',
                                {
                                    user:result[0],
                                    display:"none"
                                });
                        }
                });
    }

    //logout
    exports.logout = (req,res)=>{
        res.render('login_admin');
    }