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
        const { barcode, product_name, category_id, suggested_price, actual_price, standard_qty, product_details} = req.body;
        let store_id = 2;
        db.query('INSERT INTO products set ?',
        {
            barcode: barcode,
            store_id: store_id,
            product_name: product_name,
            category_id: category_id,
            suggested_price: suggested_price,
            actual_price: actual_price,
            standard_qty: standard_qty,
            product_details: product_details
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
                        db.query('SELECT * FROM products',(err,output)=>
                            {
                                
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
                                                color: "alert-info"
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
                  data: delData,
                  message: "Product deleted successfully!",
                  color: "alert-danger"
                });
              }
            });
          }
        });
      };
    
    exports.updateProductForm = (req, res) => {
        const id = req.params.product_id;
        db.query('SELECT * FROM products where product_id = ?', id, (err,result)=>
            {
                if(err)
                    {
                        console.log('Error message: ' + err);
                    }
                else
                    {
                        res.render('admin/product_update',{data:result[0]});
                    }
            })
    }

    exports.updateProduct = (req,res)=>{
        const {product_id, barcode, product_name, product_details, actual_price, suggested_price, standard_qty, category_id} = req.body;
        db.query('UPDATE products set barcode = ?, product_name = ?,product_details = ?,actual_price = ?,suggested_price = ?,standard_qty = ?,category_id = ? WHERE product_id = ?',
            [barcode,product_name,product_details,actual_price,suggested_price,standard_qty,category_id,product_id],
            (err,result)=>
                {
                    if(err)
                        {
                            console.log('Error message: ' + err);
                        }
                    else
                        {
                            db.query('SELECT * FROM products',(err,output)=>
                                {
                                    if(err)
                                        {
                                            console.log('Error message: ' + err);
                                        }
                                    else
                                        {
                                            res.render('admin/product_list',
                                                {
                                                    message:"Product updated successfully!",
                                                    color: "alert-info",
                                                    data: output
                                                });
                                        }
                                });
                        }
                });
    }

    exports.searchProduct=(req,res)=>{
        const {search} = req.body;
        db.query('SELECT * FROM products where product_name = ?',search,(err,result)=>
            {
                if(result==0)
                {
                    res.render('admin/product_list',
                        {
                            message: "Product not existed!",
                            color: "alert-warning"
                        });
                }
            else
                {
                    res.render('admin/product_list',
                        {
                            data:result
                        });
                }
            })
    }