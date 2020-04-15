const express = require('express');
const router = express.Router();

const db = require('../db/database')

//SHOW ALL PRODUCTS
router.get('/products', function (req, res) {
  let sql = "SELECT * FROM products";
  let query = db.query(sql, (err, results,fields) => {
    if (err) throw err;
    res.status(200).json({
      "err": false,
      "response": results
    })

  })

})


//SHOW A SINGLE PRODUCTS
router.get('/product/:id', function (req, res) {
  let products_id = req.params.id;
  if(!products_id){
   return res.status(500).json({
     "err":true,
     "message":"please provide the id"
   })
  }
  let sql = "SELECT * FROM products WHERE id = ?";
  let query = db.query(sql, products_id, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      "err": false,
      "response": results[0]
    })
  });

})

//ADD NEW PRODUCT
router.post('/products', (req, res) => {
  let product_name = req.body.product_name
  let product_price = req.body.product_price
  let id = req.body.id
  if (!product_name && !product_price && !id) {
    return res.status(500).json({
      "err": true,
      'response': results
    });
  }
  let sql = "INSERT INTO products (product_name, product_price, id) VALUE(?, ?, ?)";
  let query = db.query(sql, [product_name, product_price, id], (err, results, fields) => {
    if (err) throw err;

    res.status(200).json({
      "error": false,
      "response": results
    })
  });
});




router.put('/products/:id', (req, res) => {

  let product_name = req.body.product_name
  let product_price = req.body.product_price
  let id = req.params.id
  if (!product_name || !product_price || !id) {
    res.status(400).json({
      "error": true,
      "message": "please update"
    })
  }
  let sql = "UPDATE products SET product_name=?, product_price=? WHERE id = ?";
  let query = db.query(sql, [product_name, product_price, id], (err, results, fields) => {

    if (err) throw err;
    res.status(200).json({
      "error": false,
      "response": results
    })
  });
});

//Delete product
router.delete('/products/:id', (req, res) => {
  let id = req.params.id
  if(!id){
   return res.status(404).json({
      "err":true,
      "message":"please provide the id to delete",
      
    })
  }
  let sql = "DELETE FROM products WHERE id= ?";
  let query = db.query(sql, id, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      "err": false,
      "response": results
    })
  });
});


module.exports = router;