import express from 'express';
let router = express.Router();

router.get('/', (req, res, next) => {
  let languages = [{
      language: 'Spanish'
    },
    {
      language: "French"
    },
    {
      langauge: "German"
    }
  ];
  res.json(languages);
});

router.get('/users', (req, res, next) => {
  let users = [{
      language: 'Spanish'
    },
    {
      language: "French"
    },
    {
      langauge: "German"
    }
  ];

  res.json(users);
});

router.post('/user/create', (req, res) => {
  res.json('rafaelmelon');
})

export default router;