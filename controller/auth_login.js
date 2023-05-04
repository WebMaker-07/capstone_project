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