import dotenv from 'dotenv';
import request from 'request';
import nodemailer from 'nodemailer';
dotenv.config()

export const contants = {
  PORT: process.env.PORT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  HOST_EMAIL: process.env.HOST_EMAIL,
  HOST_EMAIL_USER: process.env.HOST_EMAIL_USER,
  HOST_EMAIL_PASS: process.env.HOST_EMAIL_PASS,
}

export const transporter = nodemailer.createTransport({
  host: contants.HOST_EMAIL,
  port: 465,
  secure: true,
  auth: {
    user: contants.HOST_EMAIL_USER,
    pass: contants.HOST_EMAIL_PASS
  }
});

export const githubOAuth = require('github-oauth')({
  githubClient: contants.GITHUB_CLIENT_ID,
  githubSecret: contants.GITHUB_CLIENT_SECRET,
  baseURL: 'http://localhost:' + contants.PORT,
  loginURI: '/login',
  callbackURI: '/callback',
  scope: 'user'
})

export const fetch = url => {
  return request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

export const fetchJSON = url =>
  new Promise((resolve, reject) =>
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        let json;

        try {
          // Hacemos un trim porque los saltos de línea CRLF petan el JSON.parse
          json = JSON.parse(body.trim());
        } catch (e) {
          return reject(e);
        }

        resolve({ url, json });
      }
    }),
  );