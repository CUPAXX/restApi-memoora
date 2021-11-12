'use strict'
const Express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()
require('./src/helpers/db')

const { PORT, CONNECTION_URL, DATABASE_NAME } = process.env

const app = Express();
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
let database, collection;

app.get('/', (req, res) => {
    res.send('welcome bro!')
});

app.listen(PORT, () => {
  console.log(`Server Running Well At PORT " ${PORT} "`)
})
let routes = require('./src/routes/app')
routes(app)
// app.post("/user", (request, response) => {
//     collection.insertOne(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });


// app.get("/user", (request, response) => {
//     collection.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
//     console.log('coba')
// });

// app.get("/user/:id", (request, response) => {
//     collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });