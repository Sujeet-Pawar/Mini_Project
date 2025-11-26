import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../config/logger.js';

let transporter;

const getTransporter = () => {
  if (transporter) {
    return transporter;
  }

  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD) {
    logger.warn('SMTP credentials are not fully configured');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT || 587,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  return transporter;
};

export const sendMail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();
  if (!mailer) {
    logger.warn('Attempted to send email without configured transporter');
    return;
  }

  const mailOptions = {
    from: env.SMTP_FROM,
    to,
    subject,
    text,
    html
  };

  await mailer.sendMail(mailOptions);
};

export default { sendMail };
