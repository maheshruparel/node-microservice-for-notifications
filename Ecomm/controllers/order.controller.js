const config = require('config');
const axios = require('axios');

const controller = {};

// orderStatus - mock JSON Object
const orderStatus = {
    '001': 'Order Placed',
    '002': 'Order Confirmed',
    '003': 'Order Packed',
    '004': 'Order Shipped',
    '005': 'Order Delivered',
    '006': 'Order Cancelled',
    '007': 'Order Amount refunded',
}

// customers - mock JSON Object
const customers = [
    {
        id: '001',
        Name: 'John Doe',
        Email: 'john@gmail.com',
        subscribedTo: ['001', '003', '005']
    },
    {
        id: '002',
        Name: 'Richard Miles',
        Email: 'richard@gmail.com',
        subscribedTo: ['001', '002', '003', '004']
    },
];

// function to fetch customer with ID, from customer Object
const getCustomer = ( customers, customerID, ) => {
    const customer = customers.filter( e => e.id === customerID );
    return customer[0];
}

// function to be called with API
controller.updateStatus =  async (req, res) => {
    const {customerID} = req.body;
    const {orderStatusID} = req.body;
    const customer = getCustomer(customers, customerID);

    if ( customer ) {

        // DB operations to update order status will go here

        if(  customer.subscribedTo.includes(orderStatusID) ) {

            // sendEmailNotification(customer, orderStatus[orderStatusID]);
            const params = {
                customer: customer,
                orderStatus: orderStatus[orderStatusID]
            };

            axios.post(config.mfnotifUrl, params).then(response => {
            } ).catch( e => { 
                console.log(e);
            });
        }
    }
    res.send('Test app is running');
};

module.exports = controller;
