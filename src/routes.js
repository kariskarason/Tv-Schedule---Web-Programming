/* eslint max-len: ["error", 300]*/

const express = require('express');

const router = express.Router();

const schedule = require('./schedule');

const pgp = require('pg-promise')();

const path = require('path');

const xss = require('xss');

const DATABASE = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/data';

const db = pgp(DATABASE);

/* Renderar forsíðuna */
router.get('/', (req, res, next) => {
  schedule.channels()
  .then((result) => {
    res.render('index', { title: 'Sjónvarpsstöðvar á Íslandi',
      channelsList: result[0].data.results[0].channels,
      comments: result[1],
      channelGrades: result[2] });
  })
  .catch((error) => {
    res.render('error', { title: 'Oh no!',
      message: 'Eitthvað fór úrskeiðis. Stöðvalisti fannst ekki.',
      error });
  });
});

/* Póstar ummælum af forsíðu og setur inn í gagnagrunn */
router.post('/', (req, res, next) => {
  let name = xss(req.body.name || '');
  if (name === '') name = 'Nafnlaus';
  const comment = xss(req.body.comment || '');
  const grade = xss(req.body.options || '');
  const channel = xss(req.body.channel || '');

  db.none(`INSERT INTO channelsTest (name, channel, grade, comment)
    VALUES ($1, $2, $3, $4)`, [name, channel, grade, comment])
    .then((data) => {
      res.redirect('/');
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
});

/* Renderar daskrársíðu fyrir ákveðna stöð */
router.get('/tv/:channel', (req, res, next) => {
  schedule.channel(`/tv/${req.params.channel}`)
  .then((result) => {
    for (let i = 0; i < result[0].data.results.length; i++) {
      result[0].data.results[i].startTime =
      result[0].data.results[i].startTime.substring(11, 16);
    }
    res.render('dagskra', { title: `Dagskrá fyrir ${req.params.channel}`,
      checker: `/tv/${req.params.channel}`,
      channelEntry: result[0].data.results,
      tvButtons: result[1].data.results[0].channels,
      comments: result[2],
      grades: result[3] });
  })
  .catch((error) => {
    res.render('error',
      { title: 'Oh no!',
        message: 'Eitthvað fór úrskeiðis. Dagskrá stöðvar fannst ekki.',
        error });
  });
});

/* Póstar ummælum af dagskrársíðu og setur inn í gagnagrunn*/
router.post('/tv/:channel', (req, res) => {
  let name = xss(req.body.name || '');
  if (name === '') name = 'Nafnlaus';
  const comment = xss(req.body.comment || '');
  const grade = xss(req.body.options || '');
  const show = xss(req.body.show || '');
  const channel = req.params.channel;

  db.none(`INSERT INTO showsTest (name, show, channel, grade, comment)
    VALUES ($1, $2, $3, $4, $5)`,
    [name, show, channel, grade, comment])
    .then((data) => {
      res.redirect(req.get('referer'));
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
});

/* Renderar Um Okkur síðuna */
router.get('/aboutus', (req, res, next) => {
  schedule.channel('/tv/ruv')
  .then((result) => {
    res.render('aboutus', {
      title: 'The Three Websketeers',
      tvButtons: result[1].data.results[0].channels });
  })
  .catch((error) => {
    res.render('error', { title: 'Oh no!',
      message: 'Síðan um okkur liggur niðri',
      error });
  });
});

module.exports = router;
