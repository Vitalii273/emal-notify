"use strict";
const nodemailer = require("nodemailer");
const credentials = require('./config');
const file = require('./finder.js')

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
        port: 465,
        auth: {
            user: credentials.USER,
            pass: credentials.PASS
        }
    });

    const message = {
        from: '"Server-email-notify 🛠" <testerrorsheet@gmail.com>', // sender address
        to: "adler.vitalii@icloud.com,rodion.vinokur@gmail.com", // list of receivers
        subject: "Server notification", // Subject line
        html: "<b>'Error server notification'</b>" +
            "<br>" +
            "<p>'You have some troubles with your server, Please fix it!'</p>",// html body
        // text: "You have some troubles with your server, Please fix it", // plain text body
        attachments: [
            {   // utf-8 string as an attachment
                path: file,
                contentType: 'text/plain'
            }
        ]
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);