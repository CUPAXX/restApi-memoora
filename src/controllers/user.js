'use strict';

const userModel = require('../models/user')
const fileModel = require('../models/files')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const writeYamlFile = require('write-yaml-file')
const crypto = require("crypto");
const {response} = require('../helpers/standarRes')



exports.listFile = (req, res) => {
  const id = req.authUser.id
  fileModel.findOne({idUser: id}, (err, results) => {
    if(err){
      return response(res, 500, false, `Error: ${err}`)
    }
    return response(res, 200, true, 'List Of File', results)
  })
}

exports.getProfile =(req, res) => {
  const id = req.authUser.id
  userModel.findOne({_id: id}, {password:0}, (err, results) => {
    if(err){
      return response(res, 500, false, `Error: ${err}`)
    }
    return response(res, 200, true, `Profile User: ${results.name}`, results)
  })
}

exports.register = async (req, res) => {
  const {name, email, country, password} = req.body
  const resPassword = await bcrypt.hash(password, await bcrypt.genSalt())
  const finalData = {name, email, country, password: resPassword}
  const data = new userModel(finalData)
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
          const fileData = new fileModel({files: path, idUser: results._id, name: results.name})
          fileData.save()
        })
      }
    })
    return response(res, 200, true, 'Register Successfully', results)
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body
  userModel.findOne({email: email}, (err, results) => {
    if(err){
      return response(res, 500, false, `Error: ${err}`)
    }
    const compare =  bcrypt.compare(password, results.password)
    if (compare) {
      const token = jwt.sign({ id: results._id, email: results.email }, process.env.APP_KEY)
      return response(res, 200, true, 'Login Success', { token })
    } else {
      return response(res, 401, false, 'wrong email or password')
    }
  })
}