const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });


    exports.viewProductCat = (req,res) =>{
        db.query('SELECT * from products_category',
        (error,result)=>
        {
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('admin/product_category',
                {
                    // title: "List of Product_Category",
                    data: result,
                    message: "Add Product"
                });
            }
            
        });
    }
// for displaying customer
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
                        console.log(result);
                        res.render('admin/customers',
                            {
                                title: "List of customers",
                                data: result
                            });
                    }
                    console.log(result)
            });
}

// for adding customer
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
                        db.query('SELECT * FROM customers',(err,data)=>
                            {
                                if(err)
                                    {
                                        console.log('Error Message: '+err);
                                    }
                                else
                                    {
                                        res.render('admin/customers',
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

exports.update = (req,res)=>{
    const id = req.params.customer_id;
    db.query('SELECT * FROM customers where customer_id = ?',[id],(err,data)=>
        {
            if(err)
                {
                    console.log('Error Message : '+err)
                }
            else
                {
                    db.query('SELECT * FROM customers',(err,result)=>
                        {
                            if(err)
                                {
                                    console.log('Error Message : '+err)
                                }
                            else
                                {
                                    res.render('admin/customers',
                                        {
                                            title: "List of customers",
                                            cus: data[0],
                                            data: result,
                                            message: "Update Customer"
                                        })
                                }
                        });
                }
        })
}

exports.updateCustomer = (req,res)=>{
    const {first_name, last_name, contact, address, customer_id} = req.body;
    db.query('UPDATE customers SET first_name = ?, last_name = ?, contact = ? , address = ? where customer_id = ?',
        [first_name,last_name,contact,address,customer_id],
        (err,result)=>
            {
                console.log(result);
                if(err)
                    {
                        console.log('Error Message : '+err);
                    }
                else
                    {
                        console.log("Customer Updated!");
                        // db.query('SELECT * FROM customers',
                        //     (err,data)=>
                        //         {
                        //             if(err)
                        //                 {
                        //                     console.log('Error Message : '+err);
                        //                 }
                        //             else
                        //                 {
                        //                     res.render('admin/customers',
                        //                         {
                        //                             title: "List of customers",
                        //                             data: data,
                        //                             message: "Customer Updated!"
                        //                         })
                        //                 }
                        //         })
                    }
            })
}
