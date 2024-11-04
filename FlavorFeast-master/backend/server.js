const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');
const expressMessages = require('express-messages');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/assets', express.static('web/assets'));

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const products = require('./routes/content');
const user = require('./routes/user');
const adminProduct = require('./routes/adminProducts');
app.use('/admin/product', adminProduct);
app.use('/', products);
app.use('/usr', user);

const port = 4000;
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});
