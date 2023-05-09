const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:  process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DATABASE_PORT
    });
    // console.log(db)


  exports.viewProductCat = (req,res) =>{
        db.query('SELECT * from products_category',
        (error,result)=>
        {
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('admin/product_category',
                {
                    action:"/auth/product-categories",
                    data: result,
                });
            }
            
        });
    }
        // update category
  exports.updateCategory = (req, res) => {
          const { category_id, category_name } = req.body;
          function valid(value)
        {
            value = value.replace(/[^a-zA-Z0-9 ]/g, '');
            value = value.trim();
            value = value.charAt(0).toUpperCase() + value.slice(1);
            return value;
        }
        category_name = valid(category_name);

          db.query('UPDATE products_category SET category_name = ? WHERE category_id = ?',
            [category_name, category_id],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send('An error occurred while updating the category.');
              } else {
                console.log(result);


                db.query('SELECT * from products_category',
                (error,output)=>
                {
                    if(error)
                    {
                        console.log("Error Message : " + error);
                    }
                    else
                    {
                        res.render('admin/product_category',
                        {
                            message:"Product category successfully updated!",
                            action:"/auth/product-categories",
                            data: output,
                            color:"alert-info"
                        });
                    }
                    
                });
              }
            }
          );
    };
        
        

    // add or update category
  exports.addProductcat = (req, res) => {
      const { category_name } = req.body;
      db.query('SELECT * FROM products_category WHERE category_name = ?', category_name, (err,result)=>
        {
          if(err)
            {
              console.log('Error message : '+err);
            }
          else if(result!=0)
            {
              res.render('admin/product_category', {
                data: result,
                message: 'Product category existed!',
                color: 'alert-warning'
              });
            }
          else if(result==0)
            {
              if(category_name == "")
                {
                    db.query('SELECT * FROM products_category',(err,output)=>{
                    if(err)
                      {
                        console.log('Error message: '+ err)
                      }
                    else
                      {
                        res.render('admin/product_category', {
                          data: output,
                          message: 'Field must not be empty!',
                          color: 'alert-warning'
                        });
                      }
                  });
                }
              else
                {
                db.query(
                  'INSERT INTO products_category SET ?',
                  {
                    category_name: category_name,
                    store_id: 1 // add default value for store_id
                  },
                  (err, result) => {
                    if (err) {
                      console.log('Error Message: ' + err);
                      res.status(500).send('An error occurred while adding the category.');
                    } else {
                      db.query('SELECT * FROM products_category', (err, data) => {
                        if (err) {
                          console.log('Error Message: ' + err);
                          res.status(500).send('An error occurred while retrieving the list of categories.');
                        } else {
                          res.render('admin/product_category', {
                            data: data,
                            message: 'Product added successfully!',
                            color: 'alert-success'
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
        });
    }
    
            

    
    
  exports.deleteProductCat = (req, res) => {
      const categoryId = req.params.category_id;
      db.query("DELETE FROM products_category WHERE category_id = ?", [categoryId], 
      (err, result) => {
        if (err) {
          console.log("Error Message: " + err);
        } else {
          db.query('SELECT * FROM products_category', (err, delData) => {
            if (err) {
              console.log('Error Message: ' + err);
            } else {
              res.render('admin/product_category', {
                title: "List of Product_Category",
                data: delData,
                message: "Product Category deleted successfully!",
                color: "alert-danger"
              });
            }
          });
        }
      });
    };
      


      
      


    
