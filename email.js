var mailer = require('nodemailer')


var account = {
    user: process.env.MAPP_MAIL_USER,
    pass: process.env.MAPP_MAIL_PWD

}

let transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated password
        }
    });


var exports = module.exports = {};







// send mail with defined transport object


exports.sendConfirmEmail = function(email, token) {

    //console.log("Sending email to user ", email)

    var url = "https://data.mapphub.uk/auth/confirm_email/" + token


    let mailOptions = {
        from: account.user,
        to: email, // list of receivers
        subject: 'The Metals Lab - Please confirm your email', // Subject line
        text: 'The MAPP Powder Database', // plain text body
        html: '<h3>MAPP Powder Database</h3><br><p>Thank you for registering with The Metals Lab. Please click the following link or copy and paste into your browsers address bar to confirm your email.</p><a href="'+ url +'">' + url + '</a></p>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.response);
    });




}


exports.sendResetEmail = function(address, token) {
    var url = "https://data.mapphub.uk/auth/change_password/" + token

    let mailOptions = {
        from: account.user, // sender address
        to: address, // list of receivers
        subject: 'The Metals Lab - Reset password link', // Subject line
        text: 'The MAPP Powder Database', // plain text body
        html: '<h3>MAPP Powder Database</h3><br><p> You have requested a password reset link. Please click the following link or copy and paste into your browsers address bar to change your password.</p><a href="'+ url +'">' + url + '</a></p>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.response);
    });


}





module.export = exports
