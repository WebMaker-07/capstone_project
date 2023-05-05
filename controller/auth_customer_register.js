const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });


    // for displaying customer
    exports.view_customer_register= (req,res) =>{
        db.query('SELECT * FROM customers ',
        (error,result)=>
        {
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('customer/customer_register',
                {
                    data: result,
                });
            }
            
        });
    }

    exports.register_customer = (req, res) => {
        const { first_name, last_name, email, password, contact, address } = req.body;
      
        // Check if email already exists
        db.query('SELECT * FROM customers WHERE email = ?', [email], (err, result) => {
          if (err) {
            console.log('Error Message: ' + err);
            res.render('customer/customer_register', {
              message: 'Error occurred while registering user!',
              color: 'alert-danger'
            });
          } else if (result.length > 0) {
            res.render('customer/customer_register', {
              message: 'Email already exists!',
              color: 'alert-danger'
            });
          } else {
            // Check password length and match
            if (password.length < 8) {
              res.render('customer/customer_register', {
                message: 'Password should be at least 8 characters long!',
                color: 'alert-danger'
              });
            } else if (password !== req.body.confirm_password) {
              res.render('customer/customer_register', {
                message: 'Passwords do not match!',
                color: 'alert-danger'
              });
            } else {
              // Insert new customer data into database
              db.query('INSERT INTO customers (first_name, last_name, email, password, contact, address, store_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                  [first_name, last_name, email, password, contact, address, 1], (err, result) => {
                  if (err) {
                    console.log('Error Message: ' + err);
                    res.render('customer/customer_register', {
                      message: 'Error occurred while registering user!',
                      color: 'alert-danger'
                    });
                  } else {
                    res.render('customer/customer_login', {
                      message: 'You have successfully registered!',
                      color: 'alert-success'
                    });
                  }
                });
            }
          }
        });
      };