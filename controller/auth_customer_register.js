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
        function valid(value)
        {
            value = value.replace(/[^a-zA-Z0-9 ]/g, '');
            value = value.trim();
            value = value.charAt(0).toUpperCase() + value.slice(1);
            return value;
        }
        first_name = valid(first_name);
        last_name = valid(last_name);
        contact = contact.trim();
        address = address.trim();
      
        // Check if email already exists
        db.query('SELECT * FROM customers WHERE email = ?', [email], async (err, result) => {
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
              const hashPassword = await encrypt.hash(password, 8);
              db.query('INSERT INTO customers set ?',
                  {
                    first_name : first_name, 
                    last_name : last_name, 
                    email: email, 
                    password: hashPassword, 
                    contact: contact, 
                    address: address, 
                    store_id: 1}, (err, result) => {
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