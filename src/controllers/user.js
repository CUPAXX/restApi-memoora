const userModel = require('../models/user')
var fs = require('fs');
const writeYamlFile = require('write-yaml-file')
var crypto = require("crypto");




exports.getUser = (req, res) => {
  userModel.find({}, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    res.status(200).json(result)
  })
}

exports.getUserById = (req, res) => {
  userModel.findOne({ _id: req.params.id}, (err, result) => {
    if(err){
      res.status(500).send(err);
    }
    if(result !== null){
      res.status(200).json(result)
    } else {
      res.status(200).json({ message: "user not found"});
    }
  })
}

exports.createUser = (req, res) => {
  const data = new userModel(req.body)
  data.save((err, result) => {
    if(err){
      res.status(500).send(err);
    }
    fs.mkdir(`./src/data/${result._id}`, { recursive: true }, function(err) {
      if (err) {
        console.log(err)
      } else {
        var id = crypto.randomBytes(7).toString('hex');
        writeYamlFile(`./src/data/${result._id}/${id}.yml`, {EMAIL: result.email, NAME: result.name})
      }
    })
    res.status(200).json(result)
  })
}

exports.updateUser = (req, res) => {
  userModel.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(result);
  });
};
  
  // deleteTodo function - To delete todo by id
exports.deleteUser = async ( req, res) => {
  await  userModel.deleteOne({ _id:req.params.id }, (err) => {
    if (err) {
       return res.status(404).send(err);
    }
    res.status(200).json({ message:"User successfully deleted"});
  });
};