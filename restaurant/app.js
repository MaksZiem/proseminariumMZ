const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const User = require('./models/user');

const restaurantRoutes = require('./routes/restaurant')
const adminRoutes = require('./routes/admin')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6585c2a7adafbe2c7251da99')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
  

app.use(restaurantRoutes)
app.use('/admin', adminRoutes)


mongoose
  .connect(
    'mongodb+srv://Login:Password@cluster0.pyphlw1.mongodb.net/restaurant?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

