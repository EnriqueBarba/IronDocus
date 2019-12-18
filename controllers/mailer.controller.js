const nodemailer = require('nodemailer');
const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});


module.exports.sendNewDocMail = (toMail, user, docTitle) => { 
    transporter.sendMail({
        from: `"IronDocus Mailer -- INFO" <IronDocus@Admin>`,
        to: toMail,
        subject: `A new documment has been created`, 
        text: `The user "${user}" has created a new document "${docTitle}"`,
        html: `<b>The user "${user}" has created a new document "${docTitle}"</b>`
    })
  .then(info => console.log(info))
  .catch(error => console.log(error))

}

module.exports.sendModDocMail = (toMail, user, docTitle) => { 
    transporter.sendMail({
        from: `"IronDocus Mailer -- INFO" <IronDocus@Admin>`,
        to: toMail,
        subject: `A documment of your department has been modified`, 
        text: `The user "${user}" has moddified the document "${docTitle}"`,
        html: `<b>The user "${user}" has moddified the document "${docTitle}"</b>`
    })
  .then(info => console.log(info))
  .catch(error => console.log(error))

}

/*
  var mailOptions = {
    from: `"IronDocus Mailer -- INFO" <IronDocus@Admin>`,
    to: toEmail,
    subject: subject, 
    text: text,
    html: '<b>Awesome Message</b>'
};
*/