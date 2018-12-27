const path = require('path');
const express = require('express');
const routes = require('./routes');
const CONFIG = require('../config');

const PORT = CONFIG.port;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.use(routes);

app.get('*', (req, res) => {
  res.status(404).send('Того, что вы запрашиваете, в наличии нет');
});

app.listen(PORT, () => {
  console.log(`Listenig on port ${PORT}`);
});

app.use((err, req, res) => {
  res.status(err.status || 500).send('На нашей стороне что-то не так, но не стоит отчаиваться');
});
