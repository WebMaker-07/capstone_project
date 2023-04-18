const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });


    exports.viewProductCat = (res,req) =>{
        var sql = "SELECT * FROM product_category";
        db.query(sql, function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    "error": "Internal Server Error"
                    });
                    return;
                    }
                    res.status(200).send(rows);
                    });
    }

