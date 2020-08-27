require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser') 
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const nodemon = require('nodemon')
const app = express()

mongoose.connect(process.env.MONGO_DB_URL, { 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB is connected'))
  .catch(error => console.log(error))

app.use(passport.initialize())
// конструкция снизу в методе require вернет функцю которую потом сразу и вызову с параметром passport
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
// делаем папку статической чтобы потом получать к ней доступ на прямую на клиенте. 
// Например если зайти на http://localhost:5000/uploads/{png/jpg img} - получим img кота т.к часть которая
// начинаеться с uploads... это то что храниться на сервере в ключе imageSrc : uploads\2106....
app.use(bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

// cors for cross-domen-request

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'client', 'index.html' )
    )
  })
}

module.exports = app