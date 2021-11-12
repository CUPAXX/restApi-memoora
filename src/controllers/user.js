const userModel = require('../models/user')
const fileModel = require('../models/files')
const fs = require('fs');
const writeYamlFile = require('write-yaml-file')
const crypto = require("crypto");
const {response} = require('../helpers/standarRes')



exports.listFile = (req, res) => {
  fileModel.find({}, (err, results) => {
    if(err){
      return response(res, 500, false, `Error: ${err}`)
    }
    return response(res, 200, true, 'List Of File', results)
  })
}


exports.register = (req, res) => {
  const data = new userModel(req.body)
  data.save((err, results) => {
    if(err){
      return response(res, 500, false, `Error: ${err}`)
    }
    fs.mkdir(`./src/data/${results._id}`, { recursive: true }, function(err) {
      if (err) {
        return response(res, 500, false, `Error: ${err}`)
      } else {
        var id = crypto.randomBytes(7).toString('hex');
        writeYamlFile(`./src/data/${results._id}/${id}.yml`, {EMAIL: results.email, NAME: results.name}).then(() => {
          const path = `./src/data/${results._id}/${id}.yml`
          const fileData = new fileModel({files: path, idUser: results._id})
          fileData.save()
        })
      }
    })
    return response(res, 200, true, 'Register Successfully', results)
  })
}