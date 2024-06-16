const Reg = require("../models/reg");
const jwt = require("jsonwebtoken");
const express = require("express");
const QueryTable = require("../models/query")
exports.homePageController = (req, res) => {
  res.send("welcome to home page");
};
exports.regController = async (req, res) => {
  const { username, password } = req.body;
  const userCheck = await Reg.findOne({
    userName: username,
    password: password,
  });

  if (userCheck === null) {
    const record = await new Reg({ userName: username, password: password });
    await record.save();
    const token = jwt.sign({ UserId:record._id }, "secrett", {
      expiresIn: "3d",
    });
    res.json({ record: record, token: token });
  } else {
    res.json({ message: "!! Oops User already exists 🤔 !!" });
  }
};

exports.usercheckController = async (req, res) => {
  const { username, password } = req.body;
  const userCheck = await Reg.findOne({
    userName: username,
    password: password,
  });
  if (userCheck === null) {
    res.json({ message: "User not found" });
  } else {
    if(userCheck.status == "Active"){
      const token = jwt.sign({ UserId: userCheck._id }, "secrett", {
        expiresIn: "3d",
        });
        
      res.json({user:userCheck,token:token});
    }
    else{
      res.json({message:"Contact admin"})
    }
  }
};
exports.queryformController = async(req,res)=>{
  const {email,text} = req.body
  console.log(req.body)
  const record = await new QueryTable({
    email:email,
    query:text
  })
  await record.save()
  res.json(record)
}
exports.QueryformdataController = async(req,res)=>{
  const record = await QueryTable.find()
  res.json(record)
}
exports.queryfindController = async(req,res)=>{
  const id = req.params.id
  const record = await QueryTable.findById(id)
   res.json(record)
}

exports.deletequeryController = async(req,res)=>{
  const id = req.params.id
  const record = await QueryTable.findByIdAndDelete(id)
  res.json({message:"Successfully Query Deleted"})
}