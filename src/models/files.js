'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const FileSchema = new Schema({
        files: {
          type:String,
          default: null
        },
        idUser: {
          type:String
        },
        name: {
          type:String
        }
    });

    const fileModel = mongoose.model("fileModel", FileSchema);
// create and export model
module.exports = fileModel;
