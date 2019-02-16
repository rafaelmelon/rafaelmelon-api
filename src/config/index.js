const Mailjet = require('node-mailjet');
import {
  env
} from '../utils/index';

export const GitHubConfig = {
  url: 'https://api.github.com',
  scope: 'user',
  state: Math.round(Math.random() * 10)
}

export const mailjet = Mailjet.connect(
  env.MJ_APIKEY_PUBLIC,
  env.MJ_APIKEY_PRIVATE
);