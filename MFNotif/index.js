const express = require("express");
const emailService = require('./email.service');
const config = require('config');
const app = express();

app.use(express.json());

const sendEmailNotification = (customer, updatedOrderStatus) => {

    let mailTo;
    let {useDefaultTestEmail} = config;

    if(useDefaultTestEmail) {
        // fetch email id from config
        mailTo = config.mailTo;
    } else {
        // set mailTo with email id in customer Object
        mailTo = customer.email;
    }

    let mailoption = {
        from: config.smtpConfig.auth.user,
        to: mailTo,
        subject: 'Order status updated ' + Date.now(),
        html: `Hello ${customer.Name}, <br><br>
        Your order status has been updated to ${updatedOrderStatus}.<br><br>
        Thank You,<br>
        <b>ABC Company Limited</b>
        <br><br><br>
        <b>Note: This is an auto-generated mail. Please do not reply.</b>`,
    };

    try {
        emailService.sendmail(mailoption);
        return true;
    } catch (e) {
        if (e) {
            console.log(e);
            return false;
        }
    }
}

app.get('/', (req, res) => {
    res.send("Welcome to MFNotif");
});

app.post('/sendNotification', async (req, res) => {
    const {customer} = req.body;
    const {orderStatus} = req.body;
    let message = 'Email Notification counld not sent';
    let mailSent;
    if ( customer && orderStatus ) {
        message = 'Email Notification sent';
        console.log( ' seding email ');
        mailSent = sendEmailNotification(customer, orderStatus);
        if (mailSent) {
            message = 'Email Notification sent successfully';
        }
    }
    res.send(message);
});

const port = config.get('expressPort');
app.listen(port, () => console.log(`App listening on port ${port} !`));
