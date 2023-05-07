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