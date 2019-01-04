const express = require('express');
const bodyParser = require('body-parser');

import {
  env,
} from './config/index';
import router from './routes/index';

const app = express();
const port = env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/', router);

app.listen(port, () => console.log(`API listening on port ${port}`));