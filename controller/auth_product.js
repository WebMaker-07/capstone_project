const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });

//View the list of stocks
exports.viewStockList= (req,res) =>{
    db.query('SELECT * FROM stocks_in LEFT JOIN products ON products.product_id = stocks_in.product_id',
    (error,result)=>
    {
        console.log(result)
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {
            res.render('admin/stock_in',
            {
                data: result,
            });
        }
        
    });
}
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
            res.render('admin/stock_in_add',
            {
                data: result,
            });
        }
        
    });
}

exports.processStock= (req,res) =>{
    const {product_id , quantity} = req.body;
    console.log(product_id);
    db.query(`INSERT INTO stocks_in(product_id , quantity) VALUES(?,?) `,[product_id ,quantity],
    (error,result)=>
    {
        console.log(result)
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {

            db.query('SELECT * FROM stocks_in LEFT JOIN products ON products.product_id = stocks_in.product_id',
            (error,result)=>
            {
                console.log(result)
                if(error)
                {
                    console.log("Error Message : " + error);
                }
                else
                {
                    
                    db.query('UPDATE products SET on_hand_stock = on_hand_stock + ? WHERE product_id = ?',
                        [quantity, product_id],
                        (err,result1)=>
                            {
                                if(err)
                                    {
                                        console.log('Error message: ' + err);
                                    }
                                else
                                    {
                                        res.render('admin/stock_in',
                                        {
                                            data: result,
                                            message: "Sucessfully Add Stocks"
                                        });
                                    }
                            });
                }
                
            });
          
        }
        
    });
}

exports.summary=(req,res)=>{
    // const totalproducts = 'SELECT COUNT(*) AS totalproducts FROM products';
    db.query('SELECT COUNT(*) AS totalproducts FROM products',
    (error,output)=>
    {
        // console.log(output)
        if(error)
        {
            console.log("Error Message : " + error);
        }
        else
        {
            // const totalproducts = output[0].totalproducts;
            // console.log(totalproducts)
            // res.render('admin/home',
            // {
            //      totalproducts: totalproducts ,
            //      note: "test"

            // });
            db.query('SELECT COUNT(*) AS totalcustomer FROM customers',
            (error,output2)=>
            {
                // console.log(output)
                if(error)
                {
                    console.log("Error Message : " + error);
                }
                else
                {
                    const totalproducts = output[0].totalproducts;
                    const totalcustomer = output2[0].totalcustomer;

                    console.log(totalproducts)
                    res.render('admin/home',
                    {
                         totalproducts: totalproducts ,
                         totalcustomer: totalcustomer ,
                         note: "test"
        
                    });
                }
                
            });
        
        }
        
    });


}