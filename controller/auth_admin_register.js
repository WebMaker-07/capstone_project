const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });


    exports.adduser = (req, res) => {
        const { first_name, middle_name, last_name, role, status, contact_number, gender } = req.body;
    
        db.query('INSERT INTO admin_accounts SET ?', {
            first_name,
            middle_name,
            last_name,
            role,
            status,
            contact_number,
            gender
        }, (err) => {
            if (err) {
                console.log('Error Message: ' + err);
                res.render('./register_admin', {
                    message: "Error occurred while adding the user!",
                    color: "alert-danger"
                });
            } else {
                db.query('SELECT * FROM admin_accounts', (err, data) => {
                    if (err) {
                        console.log('Error Message: ' + err);
                        res.render('./register_admin', {
                            message: "User added successfully! But, failed to retrieve products.",
                            color: "alert-warning"
                        });
                    } else {
                        res.render('./register_admin', {
                            data: data[0],
                            message: "User added successfully!",
                            color: "alert-success"
                        });
                    }
                });
            }
        });
    }
    