const functions = require('firebase-functions');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var WEBHOOK_SECRET = functions.config().webhook.secret;

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
      var secret = req.body.secret;
      if (secret !== WEBHOOK_SECRET) {
          res.status(403).end();
          return;
      }

      if (req.body.event == 'incoming_message') {
        var content = req.body.content;
        var from_number = req.body.from_number;
        var phone_id = req.body.phone_id;

        // do something with the message, e.g. send an autoreply
        res.json({
          messages: [
            { content: "Thanks for your message!" }
          ]
        });
      }
      res.status(200).end();
  }
);

exports.webhook = functions.https.onRequest(app);