const nodemailer = require('nodemailer');

class Email {
    static types = () => {
        return {
            VERIFICATION: 'verification',
            RECOVERY: 'recovery',
            SECURITY_BREACH: 'security_breach'
        }
    }
}

Email.verificationEmailTemplate = (verificationtoken) => {
    return `Hi! 
            Thanks for choosing to use the Habit Smasher app.
            Here is your verification code: ${verificationtoken}
            It is valid for ${(process.env.VERIFICATION_CODE_LIFESPAN_MS / 100 / 60)} minutes.
            Happy Smashing.`
}

Email.recoveryEmailTemplate = (recoveryCode) => {
    return `Hi! 
            Here is your recovery code: ${recoveryCode}
            It is valid for ${(process.env.RECOVERY_CODE_LIFESPAN_MS / 100 / 60)} minutes.
            Happy Smashing.`
}

Email.securityBreachEmailTemplate = () => {
    return `Dear user,
            Regrettably we must inform you that our encrypted database has been compromised.
            Please change your passwords immediately to protect your account.`
}

Email.sendCode = (recipient, token, type) => {

    let mailOptions = {
        from: process.env.AUTH_SERVER_PASSWORD,//'HabitSmasherApp@gmail.com',//process.env.AUTH_SERVER_EMAIL,
        pass: process.env.AUTH_SERVER_PASSWORD,
        to: recipient,
        subject: Email.types.VERIFICATION,
        text: type == Email.types.VERIFICATION ?
            Email.verificationEmailTemplate(token) :
            Email.recoveryEmailTemplate(token)
    }

    return new Promise(async (resolve, reject) => {

        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail', //process.env.AUTH_SERVER_EMAIL_SERVICE, // e.g. 'gmail'
                host: 'smtp.gmail.com', //process.env.AUTH_SERVER_EMAIL_HOST, // e.g. 'smtp.gmail.com'
                auth: {
                    user: mailOptions.from,
                    pass: mailOptions.pass
                }
            });

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) throw error;
                resolve(info.response);
            })

        } catch (err) {
            reject('error sending email');
        }
    })
}

module.exports = Email;