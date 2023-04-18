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

    db.query('SELECT * from customers',
        (error,result)=>
            {
                if(error)
                    {
                        console.log("Error Message : " + error);
                    }
                else if(result)
                    {
                        res.render('admin/customers',
                            {
                                title: "List of customers",
                                data: result,
                                message: "Add Customer"
                            });
                    }
            });
}
exports.addCustomer = (req,res)=>{
    let {first_name, last_name, contact, address} = req.body;
    db.query('INSERT INTO customers set ?',
        {
            first_name: first_name,
            last_name: last_name,
            contact: contact,
            address: address
        },
        (err,result)=>
            {
                if(err)
                    {
                        console.log('Error Message: '+err);
                    }
                else
                    {
                        db.query('SELECT * FROM cusomers',(err,data)=>
                            {
                                if(err)
                                    {
                                        console.log('Error Message: '+err);
                                    }
                                else
                                    {
                                        res.render('customers',
                                            {
                                                title: "List of customers",
                                                data: data,
                                                message: "Customer added successfully!"
                                            })
                                    }
                            })
                    }
            })
}
