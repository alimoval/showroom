const express = require('express');
const mongojs = require('mongojs');

// const db = mongojs('alik:alik1234@ds151451.mlab.com:51451/showroom');
const db = mongojs('mongodb+srv://redperch:j,\dBydR6<8B-W=H@cluster0-0x9ut.mongodb.net/redperch');


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
        // console.log('[products dsfdsfsdf]:', products)
        res.json(products);
    });
});

router.get('/product/:id', function (req, res, next) {
    db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, product) {
        if (err) {
            res.send(err);
        }
        // console.log('[product]:', product)
        res.json(product);
    });
});

module.exports = router;