import expressAsyncHandler from "express-async-handler";
import mailTransport from "../config/nodemailer.config.js";

export const sendMail = expressAsyncHandler( async (to, subject, text, html) => {
    const sentMail = await mailTransport.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        text,
        html
    });
    return sendMail;
});

