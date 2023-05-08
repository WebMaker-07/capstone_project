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