import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // ✅ Await added and template literals fixed with backticks
        const info = await transporter.sendMail({
            from: `Loopout || Edtech By Himanshi and Jhalak`,
            to: `${email}`,
            subject: `${title}`,
            html: `
                    <div>
                        <h1>Email Verification</h1>
                        <p>Your OTP is <strong>${body}</strong></p>
                        <p>Valid for 5 minutes.</p>
                    </div>
                `
        });

        console.log(info);

        return info;

    } catch (error) {
        console.log("error coming in mailsender: ", error);
    }
};
