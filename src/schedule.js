/* eslint max-len: ["error", 300]*/

const axios = require('axios');

const baseURL = process.env.baseURL || 'http://apis.is';

const instance = axios.create({ baseURL });

instance.defaults.timeout = 5000;

const pgp = require('pg-promise')();

const DATABASE = process.env.DATABASE_URL
  || 'postgres://postgres:postgres@localhost/data';
const db = pgp(DATABASE);

/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */
function channels() {
  const comments = db.any('SELECT * FROM channelsTest');
  const grades = db.any('SELECT channel, ROUND(AVG(grade), 1) as grade from channelsTest group by channel');
  const a = [instance.get('/tv'), comments, grades];
  return Promise.all(a);
}

/**
 * Fetches schedule for a channel by name, returns an array, e.g.:
 * [{ title: '...', duration: '...', startTime: '...', ...}, ...]
 * If the channel does not exist, the empty array is returned.
 *
 * @param {string} name - Name of the channel
 * @returns {Promise} - Promise with schedule for channel when resolved
 */
function channel(name) {
  const comments = db.any('SELECT * FROM showsTest');
  const grades = db.any('SELECT show, ROUND(AVG(grade), 1) as grade from showsTest group by show');
  const a = [instance.get(name), instance.get('/tv'), comments, grades];
  return Promise.all(a);
}

module.exports = {
  channels,
  channel,
};
