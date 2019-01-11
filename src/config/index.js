const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config()

export const env = {
  ...process.env,
}

export const GitHubConfig = {
  url: 'https://api.github.com',
  scope: 'user',
  state: Math.round(Math.random() * 10)
}

export const transporter = nodemailer.createTransport({
  service: env.HOST_EMAIL,
  port: 25,
  secure: false,
  auth: {
    user: env.HOST_EMAIL_USER,
    pass: env.HOST_EMAIL_PASS
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});