import nodemailer from 'nodemailer';

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_SMTP_HOST,
      port: process.env.MAIL_TRAP_SMTP_PORT,
      secure: process.env.MAIL_TRAP_SMTP_PORT === "465",
      auth: {
        user: process.env.MAIL_TRAP_SMTP_USER,
        pass: process.env.MAIL_TRAP_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // helps avoid TLS issues in dev
      },
    });

    const info = await transporter.sendMail({
      from: 'no-reply@demomailtrap.co', // add sender name
      to,
      subject,
      text,
      html, // this is optional, will fallback to plain text if not provided
    });

    console.log("✅ Mail sent:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("❌ Mail error:", error.message);
    throw error;
  }
};
