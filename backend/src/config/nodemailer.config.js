import nodemailer from "nodemailer";
import dotenv from "dotenv";


nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth:{
        user: process.env.NODEMAILER_EMAIL,
        password: process.env.NODEMAILER_PASSWORD
    }
});

export default nodemailer;