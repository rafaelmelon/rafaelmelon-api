const express = require('express');
const request = require('request');

import {
  GitHubConfig,
  transporter
} from '../config/index';

import { cacheMiddleware } from '../middleware/index';

let router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('Time: ', Date.now());

  next();
});

router.get('/user', cacheMiddleware(100), (req, res, next) => {
  const options = {
    url: `${GitHubConfig.url}/users/rafaelmelon`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body)
      res.send(info)
    }
  });
});

router.get('/repos', cacheMiddleware(100), (req, res, next) => {
  const options = {
    url: `${GitHubConfig.url}/users/rafaelmelon/repos`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body)
      res.send(info)
    }
  });
});

router.post('/contact', (req, res, next) => {
  const options = {
    from: `${req.body.email}`,
    to: 'info@rafaelmelon.es',
    subject: `📢 Mensaje enviado por ${req.body.name}`,
    text: `${req.body.notes}`,
    replyTo: `${req.body.email}`
  }

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.json('error');
    } else {
      console.log('Message sent: ' + info.response);
      res.json(info.response);
    };
  });
})

export default router;