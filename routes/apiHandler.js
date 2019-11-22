const express = require('express');
const mongojs = require('mongojs');

const db = mongojs('alik:alik1234@ds151451.mlab.com:51451/showroom');
const router = express.Router();

router.get('/products', function (req, res, next) {
    db.products.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        console.log('[products]:', products)
        res.json(products);
    });
});

router.get('/products/:category', function (req, res, next) {
    const query = req.params.category + ''
    db.products.find({category:{'$regex' : query, '$options' : 'i'}}, function (err, products) {
        if (err) {
            res.send(err);
        }
        console.log('[products]:', products)
        res.json(products);
    });
});

module.exports = router;