const nodemailer = require('nodemailer')

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SNPT_HOST,
        port: process.env.SNPT_PORT,
        service: process.env.SNPT_SERVICE,
        auth: {
            user: process.env.SNPT_MAIL,
            pass: process.env.SNPT_PASS
        }
    })

    const mailOptions = {
        from: process.env.SNPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendMail