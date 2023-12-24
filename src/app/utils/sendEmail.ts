import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail = async () => {
    console.log('hello')

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        // secure: true,
        secure: config.NODE_ENV !== 'development',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "shihabdev68@gmail.com",
            pass: "kfsd ovwm fvkd cgfx",
        },
    });
    await transporter.sendMail({
        from: 'shihabdev68@gmail.com', // sender address
        to: "uddinmdshihab452@gmail.com", // list of receivers
        subject: "Hello ✔ .Assalamu alikum . Please change your password", // Subject line
        text: "Hello ? ki khobor .. Password change koro na holay moro", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}