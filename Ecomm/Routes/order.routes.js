const express = require('express');
const router = express.Router(); 
const orderController = require('../controllers/order.controller');

router.post(
    '/updateStatus',
    (req, res) => {
        orderController.updateStatus(req, res);
    }
);

router.get('/', (req, res) => {
    res.send("Welcome to ecomm/order");
});

module.exports = router;
