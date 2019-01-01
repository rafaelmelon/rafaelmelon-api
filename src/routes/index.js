import express from 'express';

import {
  fetch,
  fetchJSON,
  githubOAuth,
  transporter
} from '../config/index';

let router = express.Router();

router.use((req, res, next) => {
  const origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  console.log('Time: ', Date.now());

  next();
});

router.get("/login", (req, res) => {

  return githubOAuth.login(req, res);
});

router.get("/callback", (req, res) => {
  return githubOAuth.callback(req, res);
});

router.get('/users', (req, res, next) => {
  const example = [{
      user1: 'User 1'
    },
    {
      user2: 'User 2'
    },
  ];

  res.json(example);
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