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
exports.view_customer = (req,res)=>{
    db.query('CALL customer_list()',
        (error,result)=>
            {
                output = result[0];
                if(error)
                    {
                        console.log("Error Message : " + error);
                    }
                else if(result)
                    {
                        res.render('admin/customers',
                            {
                                data: output
                            });
                    }
            });
}

// for adding customer
exports.add_customer = (req,res)=>{
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
                        db.query('CALL customer_list()',(err,data)=>
                            {
                                output= data[0];
                                if(err)
                                    {
                                        console.log('Error Message: '+err);
                                    }
                                else
                                    {
                                        res.render('admin/customers',
                                            {
                                                data: output,
                                                title: "Customer successfully added!"
                                            })
                                    }
                            });
                    }
            });
}

exports.update_form = (req,res)=>{
    const id = req.params.customer_id;
    db.query('SELECT * FROM customers where customer_id = ?',[id],(err,data)=>
        {
            if(err)
                {
                    console.log('Error Message : '+err)
                }
            else
                {
                    res.render('admin/customer_update',{ data: data[0]});
                }
        })
}

exports.update_customer = (req,res)=>{
    const {first_name, last_name, contact, address, customer_id} = req.body;
    db.query('UPDATE customers SET first_name = ?, last_name = ?, contact = ? , address = ? where customer_id = ?',
        [first_name,last_name,contact,address,customer_id],
        (err,result)=>
            {
                // console.log(result);
                if(err)
                    {
                        console.log('Error Message : '+err);
                    }
                else
                    {
                        console.log("Customer Updated!");
                        db.query('CALL customer_list()',(err,data)=>
                            {
                                output= data[0];
                                if(err)
                                    {
                                        console.log('Error Message: '+err);
                                    }
                                else
                                    {
                                        res.render('admin/customers',
                                            {
                                                data: output,
                                                title: "Customer successfully updated!"
                                            })
                                    }
                            });
                    }
            })
}

exports.customer_delete = (req,res)=>{
    const id = req.params.customer_id;
    db.query('DELETE FROM customers where customer_id = ?', [id],
        (error,data)=>
            {
                if(error)
                    {
                        console.log("Error Message : " +error)
                    }
                else
                    {
                        db.query('CALL customer_list()',
                        (error,result)=>
                            {
                                output = result[0];
                                if(error)
                                    {
                                        console.log("Error Message : " + error);
                                    }
                                else if(result)
                                    {
                                        res.render('admin/customers',
                                            {
                                                data: output,
                                                title: "Customer successfully deleted!"
                                            });
                                    }
                            });
                    }
            });
            
}