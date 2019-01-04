const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
dotenv.config()

export const env = {
  ...process.env,
}

export const GitHubConfig = {
  url: 'https://api.github.com',
  scope: 'user',
  state: Math.round(Math.random() * 10)
}

export const transporter = nodemailer.createTransport(smtp({
  service: env.HOST_EMAIL,
  port: 143,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: env.HOST_EMAIL_USER,
    pass: env.HOST_EMAIL_PASS
  }
}));