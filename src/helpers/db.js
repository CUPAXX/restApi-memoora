const  mongoose = require("mongoose");
require('dotenv').config()

const { CONNECTION_URL } = process.env


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
