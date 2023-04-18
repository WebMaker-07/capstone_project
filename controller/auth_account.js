const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });

exports.viewCustomer = (req,res)=>{
    console.log('HELLO!');
    res.send('Hello');
    // db.query('SELECT * from customers',
    //     (error,result)=>
    //         {
    //             if(error)
    //                 {
    //                     console.log("Error Message : " + error);
    //                 }
    //             else if(result)
    //                 {
    //                     console.log(result);
    //                 }
    //         });
}