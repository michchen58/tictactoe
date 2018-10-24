const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const path = require('path');

const PORT = process.env.PORT;

app.use('/', express.static(path.join(__dirname, 'client/dist/')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
