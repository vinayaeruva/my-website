const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like your HTML form)
app.use(express.static('index.html'));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use your preferred email service
        auth: {
            user: 'vinayaeruva@gmail.com', // Your email
            pass: 'Aeruva1345@' // Your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'vinayaeruva@gmail.com', // Your email to receive messages
        subject: `New Contact Form Submission from ${name}`,
        text: `Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vinayaeruva@gmail.com',
            pass: 'Aeruva1345@'
        }
    });

    const mailOptions = {
        from: email,
        to: 'vinayaeruva@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

