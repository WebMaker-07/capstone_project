const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });

    exports.viewProductList = (req,res) =>{
        db.query('SELECT * FROM products p JOIN products_category pc ON p.category_id = pc.category_id;',
        (error,result)=>
        {
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('admin/product_list',
                {
                    data: result,
                });
            }
            
        });
    }

    
    exports.addProductList = (req,res)=>{
        const { product_id, product_name, category_id, suggested_price, actual_price, product_status } = req.body;
        db.query('INSERT INTO products set ?',
        {
            product_id, product_id,
            product_name: product_name,
            category_id: category_id,
            suggested_price: suggested_price,
            actual_price: actual_price,
            product_status: product_status            
        },
        (err,result)=>
        {
                // console.log(db);
                if(err)
                    {
                        console.log('Error Message: '+err);
                    }
                else
                    {
                        db.query('CALL get_products_with_category_name()',(err,data)=>
                            {
                                output= data[0];
                                if(err)
                                    {
                                        console.log('Error Message: '+err);
                                    }
                                else
                                    {
                                        res.render('admin/product_list',
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

    
    exports.deleteProductList = (req, res) => {
        const productId = req.params.product_id;
        db.query("DELETE FROM products WHERE product_id = ?", [productId], 
        (err, result) => {
          if (err) {
            console.log("Error Message: " + err);
          } else {
            db.query('SELECT * FROM products', (err, delData) => {
              if (err) {
                console.log('Error Message: ' + err);
              } else {
                res.render('admin/product_list', {
                  title: "List of Product_List",
                  data: delData,
                  message: "Product  deleted successfully!",
                  color: "alert-danger"
                });
              }
            });
          }
        });
      };