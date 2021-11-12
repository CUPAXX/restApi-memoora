'use strict'
const Express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()
require('./src/helpers/db')

const { PORT } = process.env

const app = Express();
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('welcome bro!')
});

app.listen(PORT || 5000, () => {
  console.log(`Server Running Well At PORT " ${PORT} "`)
})
let routes = require('./src/routes/app')
routes(app)
