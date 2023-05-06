const mysql = require('mysql2');
const encrypt = require('bcrypt');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });


    exports.viewuser = (req,res) =>{
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
                res.render('register_admin',
                {
                    data: result,
                });
            }
            
        });
    }


        exports.adduser = (req,res)=>{
        const { store_name, user_name, main_admin_firstname, main_admin_lastname, user_password, user_email,  } = req.body;
        // Check if email already exists
        db.query('SELECT * FROM stores WHERE user_email = ?', [user_email], (err, result) => {
            if (err) {
                console.log('Error Message: ' + err);
                res.render('register_admin', {
                    message: 'Error occurred while registering user!',
                    color: 'alert-danger'
                });
            } else if (result.length > 0) {
                res.render('register_admin', {
                    message: 'Email already exists!',
                    color: 'alert-danger'
                });
            } else {
                // Check if username already exists
                db.query('SELECT * FROM stores WHERE user_name = ?', [user_name], async (err, result) => {
                    if (err) {
                        console.log('Error Message: ' + err);
                        res.render('register_admin', {
                            message: 'Error occurred while registering user!',
                            color: 'alert-danger'
                        });
                    } else if (result.length > 0) {
                        res.render('register_admin', {
                            message: 'Username already exists!',
                            color: 'alert-danger'
                        });
                    } else {
                        // Check password length and match
                        if (user_password.length < 8) {
                            res.render('register_admin', {
                                message: 'Password should be at least 8 characters long!',
                                color: 'alert-danger'
                            });
                        } else if (user_password !== req.body.confirm_password) {
                            res.render('register_admin', {
                                message: 'Passwords do not match!',
                                color: 'alert-danger'
                            });
                        } else {
                            const hashPassword = await encrypt.hash(user_password, 8);
                            db.query('INSERT INTO stores SET ?', {
                                store_name: store_name,
                                user_name: user_name,
                                main_admin_firstname: main_admin_firstname,
                                main_admin_lastname: main_admin_lastname,
                                user_password: hashPassword,
                                user_email: user_email
                            }, (err,result)=>{
                                if(err) {
                                    console.log('Error Message: ' + err);
                                    res.render('register_admin', {
                                        message: 'Error occurred while registering user!',
                                        color: 'alert-danger'
                                    });
                                } else {
                                    db.query('SELECT * FROM stores', (err,data)=>{
                                        output= data[0];
                                        if(err) {
                                            console.log('Error Message: ' + err);
                                            res.render('register_admin', {
                                                message: 'Error occurred while registering user!',
                                                color: 'alert-danger'
                                            });
                                        } else {
                                            res.render('login_admin', {
                                                data: output,
                                                message: 'You have successfully registered!',
                                                color: 'alert-success'
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    