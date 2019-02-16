const express = require('express');
const bodyParser = require('body-parser');
const secure = require('express-force-https');
const cors = require('cors');

import {
  env,
} from './utils/index';
import router from './routes/index';

const app = express();
const port = env.PORT || 3000;

app.use(secure);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use('/', router);

app.listen(port, () => console.log(`API listening on port ${port}`));