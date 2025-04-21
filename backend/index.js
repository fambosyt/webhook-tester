const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let lastWebhook = null;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
  lastWebhook = {
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  };
  console.log('📨 Webhook received:', lastWebhook);
  res.status(200).send({ message: 'Webhook received!' });
});

app.get('/latest', (req, res) => {
  res.send(lastWebhook || { message: 'No webhook received yet.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook Tester listening at http://localhost:${PORT}`);
});
