import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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
  host: env.HOST_EMAIL,
  port: 465,
  secure: true,
  auth: {
    user: env.HOST_EMAIL_USER,
    pass: env.HOST_EMAIL_PASS
  }
});
