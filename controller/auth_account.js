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
                                                message: "Customer added successfully!",
                                                color: "alert-success"
                                            });
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
    let {first_name, last_name, contact, address, customer_id} = req.body;
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
                                                message: "Customer updated successfully!",
                                                color: "alert-info"
                                            })
                                    }
                            });
                    }
            });
}

//for deleting customer
exports.customer_delete = (req,res)=>{
    const id = req.params.customer_id;
    db.query('DELETE FROM customers where customer_id = ?',[id],
        (error,result)=>
            {
                if(error)
                    {
                        console.log("Error message: " + error);
                    }
                else
                    {
                        db.query('CALL customer_list()',
                        (error,result)=>
                            {
                                output = result[0];
                                console.log(output);
                                if(error)
                                    {
                                        console.log("Error Message : " + error);
                                    }
                                else if(result)
                                    {
                                        res.render('admin/customers',
                                            {
                                                data: output,
                                                message: "Customer deleted successfully!",
                                                color: "alert-danger"
                                            });
                                    }
                            });
                    }
            })
}