const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });

exports.seacrhProduct= (req,res) =>{
        const {search} = req.body;
        console.log(search);
        db.query(`SELECT * FROM products LEFT JOIN products_category on products_category.category_id = products.category_id WHERE product_name LIKE ? `,[`%${search}%`],
        (error,result)=>
        {
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('admin/order_add',
                {
                    data: result,
                });
            }
            
        });
    };

exports.addOrder=(req,res)=>{
    const productId = req.body.product_id;
    const productName = req.body.product_name;
    const quantity = req.body.quantity;
    const productPrice = req.body.product_price;
    const totalAmount = quantity * productPrice;
    console.log( productId + productName + quantity  + productPrice + totalAmount) 
    // var newOrder={
    //     product_id: productId,
    //     product_name: productName,
    //     quantity : quantity, 
    // };
    // productOrder.push(newOrder);
    db.query(`INSERT INTO on_process_order(product_id ,product_name, quantity, product_price, total_price ) VALUES(?,?,?,?,?) `,
        [productId , productName,  quantity,productPrice, totalAmount],
        (error,result)=>
        {
            console.log(result);
            if(error)
            {
                console.log("Error Message : " + error);
                res.render('admin/order_add',
                {
                    message: 'Failed to Add in cart',
                    color: 'alert-warning'
                });
            }
            else
            {

                res.render('admin/order_add',
                {
                    message: productName + ' successfully added in cart.',
                    color: 'alert-success'
                });
            }
            
        });

}

exports.removeProducts =(req,res)=>{
    const onProcess_id = req.body.on_process_id;

    db.query(`DELETE  FROM on_process_order WHERE on_process_id = ? `,[onProcess_id ],
        (error,result)=>
        {
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
              db.query(`SELECT * FROM on_process_order`, (error,result)=>{
                if(error)
                   {
                    console.log("Error Message : " + error);
                   }
                   else{
                  
                        res.render('admin/order_on_process',
                        {
                            data: result,
                            message: "Product Remove Successfully",
                            color: "alert-danger"
                        });
                   
                   }

                })
            }
               
        
        });

}

exports.onProcessProducts =(req,res)=>{
    db.query(`SELECT * FROM on_process_order `,
    (error,result)=>
    {
        console.log(result)
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {
            
            db.query(`SELECT * FROM customers`,
            (error,output)=>
            {
                console.log(output)
                if(error)
                {
                    console.log("Error Message : " + error);
                }
                else
                {
                    let totalPrice = 0;
                    for (const row of result) {
                    totalPrice += row.total_price;
                    }
                    console.log(totalPrice);
                    res.render('admin/order_on_process',
                    {
                        data: result,
                        totalPrice: totalPrice,
                        customers: output
                    });
                }
                
            });
        }
        
    });
}

exports.transactOrder =(req,res)=>{
    function generateRandomNumber() {
        const min = 100000000;
        const max = 999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
        return randomString;
      }
      
// for transaction number
      const length = 9;
      const transactionid = generateRandomString(length);
  // for reference number
     const order_referenceid = generateRandomNumber();

     const product_info = req.body//data retrieve
     const grand_total = req.body.grand_total;
     const customer_id = req.body.customer_id;
     const payment = req.body.customer_payment;
    const payment_method = req.body.payment_method;

    const customer_change = payment- grand_total;
    const store_id = 1;
     console.log( transactionid );
    const transaction = `INSERT INTO transactions
    (transaction_id,
        customer_id ,
        store_id, 
        total_amount,
        customer_payment, 
        payment_method, 
        customer_change  ) VALUES(?,?,?,?,?,?,?);`;
        const insertRetrievedQuery =
         `INSERT INTO orders_details (
            product_id, quantity,product_price,total_price) 
         VALUES (?,?,?,?)`;
   const order_details = `INSERT INTO orders_details
         (transaction_id,
          customer_id,
          product_id, 
          quantity, 
          product_price,
          total_price,
          store_id,
          order_reference_id) VALUES(?,?,?,?,?,?,?,?);`;
    const orders = `INSERT INTO orders
              (orders_reference_id , total_amount, customer_id,store_id)
               VALUES(?,?,?,?);`;
//    alert(customer_change );
    db.query(transaction,
        [transactionid,
          customer_id ,
          store_id,  
          grand_total,
          payment,
          payment_method,
          customer_change ],
    (error,result)=>
    {
        
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {
            db.query(orders,
                [order_referenceid , grand_total, customer_id,store_id],
                (error,result2)=>
                {
                    
                    console.log(result2)
                    if(error)
                    {
                        console.log("Error Message : " + error);
                    }
                    else
                    {
                     console.log('success1');
                      console.log('success3')
                      for (let i = 0; i < product_info.product_id.length; i++) {
                        const product_id = product_info.product_id[i];
                        const product_price = product_info.product_price[i];
                        const quantity = product_info.quantity[i];
                        const total_price = product_info.total_price[i];
                        
                    
                        // Add more fields as needed
                    
                        const insertQuery = `INSERT INTO orders_details ( 
                            transaction_id,
                            customer_id,
                            product_id, 
                            quantity,
                            product_price,
                            total_price,
                            store_id,
                            order_reference_id) 
                         VALUES (?,?,?,?,?,?,?,?)`;
                        db.query(insertQuery, 
                            [transactionid,customer_id,
                            product_id, quantity,
                            product_price,total_price,
                            store_id, order_referenceid], (error, result2) => {
                          if (error) {
                            console.error('Error inserting data:', error);
                            // Handle the error as desired
                          }
                          else{
                            console.log("success2");
                            db.query(`TRUNCATE on_process_order`,
                            (error,result)=>
                            {
                                console.log(result)
                                if(error)
                                {
                                    console.log("Error Message : " + error);
                                }
                                else
                                {
                                    db.query('SELECT * FROM orders JOIN customers ON customers.customer_id = orders.customer_id',
                                    (error,result)=>
                                    {
                                        if(error)
                                        {
                                            console.log("Error Message : " + error);
                                        }
                                        else
                                        {
                                            // console.log('success 4');
                                            // res.render('admin/order',
                                            // {
                                            //     message:  'Order Succefully Process',
                                            //     color: 'alert-success',
                                            //     data: result,
                                            // });
                                            db.query('UPDATE products SET on_hand_stock = on_hand_stock - ? WHERE product_id = ?',
                                                [quantity, product_id],
                                                (err,result1)=>
                                             {
                                                if(err)
                                                    {
                                                        console.log('Error message: ' + err);
                                                    }
                                                else
                                                    {
                                                        console.log('success 4');
                                                        res.render('admin/order',
                                                        {
                                                            message:  'Order Succefully Process',
                                                            color: 'alert-success',
                                                            data: result,
                                                        });
                                                    }
                                            });
                                        }
                                        
                                    });
                                

                                }
                                   
                            
                            });
                          
                          }
                        });
                      }
                    }
                    
                });
           
        }
        
    });
}

exports.viewOrders = (req,res) =>{
    db.query('SELECT * FROM orders JOIN customers ON customers.customer_id = orders.customer_id',
    (error,result)=>
    {
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {
            res.render('admin/order',
            {
                data: result,
            });
            
        }
        
    });
}