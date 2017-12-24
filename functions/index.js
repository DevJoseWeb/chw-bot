'use strict';

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

const handleText = require('./handleText');

const app = express();
const WEBHOOK_SECRET = functions.config().webhook.secret;

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    const secret = req.body.secret;
    if (secret !== WEBHOOK_SECRET) {
        return res.status(403).end();
    }

    if (req.body.event == 'incoming_message') {
      const input = req.body.content;
      // const from_number = req.body.from_number;
      const phoneId = req.body.phone_id;

      handleText(phoneId, input).then(nextQuestion => {
        return res.status(200).json({
          messages: [
            { content: nextQuestion }
          ]
        });
      }).catch(err => {
        console.err('Error: ', err);
        return res.status(200).json({
          messages: [
            { content: 'We encountered an error, please try again later.' }
          ]
        });
      })
    }
  }
);

exports.webhook = functions.https.onRequest(app);