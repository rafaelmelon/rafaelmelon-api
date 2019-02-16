const express = require('express');
const request = require('request');

import {
  GitHubConfig,
  mailjet
} from '../config/index';

import {
  cacheMiddleware
} from '../middleware/index';

let router = express.Router();

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
    } else {
      res.status(res.statusCode).json(null);
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
    } else {
      res.status(res.statusCode).json(null);
    }
  });
});

router.post('/contact', (req, res, next) => {
  const options = {
    'FromEmail': req.body.email,
    'FromName': req.body.name,
    'Subject': `📢 Mensaje enviado por ${req.body.name}`,
    'Text-part': req.body.notes,
    'Recipients': [{
      'Email': 'info@rafaelmelon.com'
    }],
  };

  mailjet.post('send')
    .request(options)
    .then(data => {
      console.log('Message sent: ' + data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      throw new Error(err.ErrorMessage);
    });
})

export default router;