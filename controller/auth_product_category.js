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

    exports.addProductcat = (req,res) =>{
        let {category_name} = req.body;
        
        if (!category_name) { 
            res.render('admin/product_category', {
                title: "List of category",
                message: "Please enter a category name!",
                color: "alert-danger"
            });
            return; 
        }
        
        
        db.query('INSERT INTO products_category(category_name) VALUES(?)', 
            category_name
        , (err, result) => {
            if (err) {
                console.log('Error Message: ' + err);
            } else {
                db.query('SELECT * FROM products_category', (err, data) => {
                    if (err) {
                        console.log('Error Message: ' + err);
                    } else {
                        res.render('admin/product_category', {
                            title: "List of category",
                            data: data,
                            message: "Product Category added successfully!",
                            color: "alert-success"
                        })
                        
                    }
                })
            }
        })

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
      
      exports.updateProductCat = (req, res) => {
        const categoryId = req.params.category_id;
        db.query("SELECT * FROM products_category WHERE category_id = ?", [categoryId], (err, data) => {
          if (err) {
            console.log('Error Message: ' + err);
          } else {
            res.render('admin/product_category', {
              title: "Update Product Category",
              data: data[0]
            });
          }
        });
      };


      
      exports.updateProductCatSubmit = (req, res) => {
        const categoryId = req.params.category_id;
        const { category_name } = req.body;
        db.query("UPDATE products_category SET category_name = ? WHERE category_id = ?", [category_name, categoryId], (err, result) => {
          if (err) {
            console.log('Error Message: ' + err);
          } else {
            db.query('SELECT * FROM products_category', (err, data) => {
              if (err) {
                console.log('Error Message: ' + err);
              } else {
                res.render('admin/product_category', {
                  title: "List of Product Category",
                  data: data,
                  message: "Product Category updated successfully!",
                  color: "alert-primary"
                });
              }
            });
          }
        });
      };
      


    
