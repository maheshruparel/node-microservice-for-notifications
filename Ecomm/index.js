const express = require("express");
const config = require('config');
const app = express();

app.use(express.json());

const orderRoute = require('./Routes/order.routes');

app.use('/order', orderRoute);

app.get('/', (req, res) => {
    res.send("Welcome to Ecomm");
});

const port = config.get('expressPort');

app.listen(port, () => console.log(`App listening on port ${port} !`));
