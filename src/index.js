import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import config from './config/index';
import router from './routes/index';

const app = express();

var githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_CLIENT_ID,
  githubSecret: config.GITHUB_CLIENT_SECRET,
  baseURL: 'http://localhost:' + config.PORT,
  loginURI: '/login',
  callbackURI: '/callback',
  scope: 'user'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', router);

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

app.get("/login", function (req, res) {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/callback", function (req, res) {
  console.log("received callback");
  return githubOAuth.callback(req, res);
});

githubOAuth.on('error', function (err) {
  console.error('there was a login error', err)
})

githubOAuth.on('token', function (token, serverResponse) {
  console.log('here is your shiny new github oauth token', token)
  serverResponse.end(JSON.stringify(token))
})

// Handles any requests that don't match theones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


app.listen(config.PORT, () => console.log(`App listening on port ${config.PORT}`)); 