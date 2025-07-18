import nodemailer from 'nodemailer'

export const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_TRAP_SMTP_HOST,
            port: process.env.MAIL_TRAP_SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_TRAP_SMTP_USER,
                pass: process.env.MAIL_TRAP_SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'noreply@inngest',
            to,
            subject,
            text,
        });

        console.log("Mail Send: ", info.messageId);
        return info.messageId;
    } catch (error) {
        console.log("❌ Mail error ", error.message);
        throw error
    }
};