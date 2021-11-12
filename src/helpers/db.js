const  mongoose = require("mongoose");
require('dotenv').config()

const { PORT, CONNECTION_URL, DATABASE_NAME } = process.env
let database, collection;


// const connection = MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
//     if(error) {
//         throw error;
//     }
//     database = client.db(DATABASE_NAME);
//     collection = database.collection("user");
//     console.log("Connected to `" + DATABASE_NAME + "` WITH PORT " + PORT);
// });
// module.exports = connection


const  options = {
  useNewUrlParser:  true,
  useUnifiedTopology:  true
};
    
    // Connect MongoDB Atlas using mongoose connect method
mongoose.connect(CONNECTION_URL, options).then(() => {
    console.log("Database connection established!");
},
err  => {
  {
    console.log("Error connecting Database instance due to:", err);
  }
});