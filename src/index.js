import express from 'express';
import bodyParser from 'body-parser';

import {
  contants,
  githubOAuth,
} from './config/index';
import router from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', router);

githubOAuth.on('error', (err) => {
  console.error('there was a login error', err)
})

githubOAuth.on('token', (token, serverResponse) => {
  console.log('here is your shiny new github oauth token', token)
  serverResponse.end(JSON.stringify(token))
})

app.listen(contants.PORT, () => console.log(`App listening on port ${contants.PORT}`));