'use strict';
module.exports = function(app) {
  let productsCtrl = require('./productscontroller');

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get) //Lay thong tin tat ca san pham co trong table products
//     .post(productsCtrl.store); //Them moi 1 san pham vao table products

//   app.route('/products/:productId')
//     .get(productsCtrl.detail) //Lay thong tin chi tiet cua san pham dua theo id 
//     .put(productsCtrl.update) //Update lai 1 san pham trong table products dua theo id(Tu dong theo filter ?)
//     .delete(productsCtrl.delete); //Xoa 1 sp dua theo id
};