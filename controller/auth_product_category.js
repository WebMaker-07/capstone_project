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
            console.log(result)
            if(error)
            {
                console.log("Error Message : " + error);
            }
            else
            {
                res.render('admin/product_category',
                {
                    data: result,
                });
            }
            
        });
    }
        // update category
    exports.updateCategory = (req, res) => {
      const { category_id, category_name } = req.body;
      db.query(
          'UPDATE products_category SET category_name = ? WHERE category_id = ?',
          [category_name, category_id],
          (err, result) => {
              if (err) {
                  console.log(err);
                  res.status(500).send('An error occurred while updating the category.');
              } else {
                  console.log(result);
                  res.redirect('/admin/product_category');
              }
          }
      );
    }

    // add or update category
    exports.addProductcat = (req,res)=>{
      const { category_name } = req.body;
      db.query('INSERT INTO products_category SET ?',
      {
          category_name: category_name,
          store_id: 1 // add default value for store_id
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
                      db.query('SELECT * FROM products_category',(err,data)=>
                          {
                              output= data[0];
                              if(err)
                                  {
                                      console.log('Error Message: '+err);
                                  }
                              else
                                  {
                                      res.render('admin/product_category',
                                          {
                                              data: output,
                                              message: "product added successfully!",
                                              color: "alert-success"
                                          });
                                  }
                          });
                  }
          });
    };
        

    
    
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
      


      
      


    
