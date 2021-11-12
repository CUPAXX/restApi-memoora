const userModel = require('../models/user')

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