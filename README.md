# Node Microservice for Notifications
A NodeJS demo project to send notifications with Microservices.


# There are two node servers
1. Main setup - REST API

2. Sub setup - Microserice for mail notifications


Main Setup
----------
Folder : Ecomm

Access URL : localhost:5555

Microserice
-
Folder : MFNotif

Access URL : localhost:5511

Start Both Node servers


# Test with POSTMAN

Call URL:" localhost:5555/order/updateStatus" 
Method: Post

Param: {
    "customerID": "001",
    "orderStatusID": "001"
}

It will send email to the either test email ID or the email id set in customer object.

Set config JSON object in MFNotif/config/default.json

# Following mock JSON is used instead of Database

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

const orderStatus = {
    '001': 'Order Placed',
    '002': 'Order Confirmed',
    '003': 'Order Packed',
    '004': 'Order Shipped',
    '005': 'Order Delivered',
    '006': 'Order Cancelled',
    '007': 'Order Amount refunded',
}


