'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const UserSchema = new Schema({
        name: {
          type:String,
          required:true
        },
        email:{
          type:String,
          required:true
        },
        country:{
          type:String,
          required:true
        }
    });

    const userModel = mongoose.model("userModel", UserSchema);
// create and export model
module.exports = userModel;
