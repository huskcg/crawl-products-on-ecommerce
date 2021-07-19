'use strict'

const util = require('util');
const document_add = require('./document_add');
// const Timkiem = require("./search");
const search = require('./search');



module.exports = {
    get: async (req, res) => {
        var data = await search.search()
        console.log(data);
        res.json(data.hits.hits)
    }
    // detail: (req, res) => {
    //     let sql = 'SELECT * FROM products WHERE id = ?'
    //     db.query(sql, [req.params.productId], (err, response) => {
    //         if (err) throw err
    //         res.json(response[0])
    //     })
    // },
    // update: (req, res) => {
    //     let data = req.body;
    //     let productId = req.params.productId;
    //     let sql = 'UPDATE products SET ? WHERE id = ?'
    //     db.query(sql, [data, productId], (err, response) => {
    //         if (err) throw err
    //         res.json({message: 'Update success!'})
    //     })
    // },
    // store: (req, res) => {
    //     let data = req.body;
    //     let sql = 'INSERT INTO products SET ?'
    //     db.query(sql, [data], (err, response) => {
    //         if (err) throw err
    //         res.json({message: 'Insert success!'})
    //     })
    // },
    // delete: (req, res) => {
    //     let sql = 'DELETE FROM products WHERE id = ?'
    //     db.query(sql, [req.params.productId], (err, response) => {
    //         if (err) throw err
    //         res.json({message: 'Delete success!'})
    //     })
    // }
}