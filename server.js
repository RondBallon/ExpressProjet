const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('BONJOUR NODE FAIS TON TAFF');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`serveur bananes en route sur le port: ${server.address().port}`);
});
