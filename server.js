const express = require('express');
const app = express();
const Port = 5000;
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const connectDB = require('./database/connect');

app.use(express.json({ extended: false }));
app.use(fileUpload());

connectDB();

app.use('/api/users', require('./routes/api/user'));
app.use('/api/seller', require('./routes/api/seller'));
app.use('/api/shop', require('./routes/api/shop'));
app.use('/api/products', require('./routes/api/product'));
app.use('/api/commande', require('./routes/api/commande'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/authSeller', require('./routes/api/authSeller'));

app.listen(Port, (err) => {
  if (err) console.log('server not running');
  else console.log(`sever running at ${Port}`);
});
