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
        html: mailBody(`<b>The user <i>"${user}"</i> has created a new document <i>"${docTitle}"</i></b>`)
    })
  .then(console.info)
  .catch(console.error)
}

module.exports.sendModDocMail = (toMail, user, docTitle) => { 
    transporter.sendMail({
        from: `"IronDocus Mailer -- INFO" <IronDocus@Admin>`,
        to: toMail,
        subject: `A documment of your department has been modified`, 
        text: `The user "${user}" has moddified the document "${docTitle}"`,
        html: mailBody(`<p><b>The user <i>"${user}"</i> has moddified the document <i>"${docTitle}"</i></b></p>`)
    })
  .then(console.info)
  .catch(console.error)
}

const mailBody = (text) => {
  return `<div style="background-color:#80808026;text-align:center;border: 1px solid #80808026;">
            <h1>---  <u>IronDocus</u>  ---</h1>
            <hr style="border-color:#80808026;">
            </br>
            ${text}
            </br>
            <hr style="border-color:#80808026;">
            <p><i>IronDocus@gmail.com</i></p>
          </div>`
}