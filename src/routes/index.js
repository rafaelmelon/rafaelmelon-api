import express from 'express';

import {
  fetch,
  fetchJSON,
  githubOAuth
} from '../config/index';

let router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'path/to/your/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

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

export default router;