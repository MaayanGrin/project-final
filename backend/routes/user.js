const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('',(req,res,next) => {
  User.find().then(doc => { res.status(200).json(doc);}).catch(err => {
 res.status(500).json({error:err});
});
 });


router.get('/:email',(req,res,next) => {
  console.log(req.params.email );
  User.findOne({email:req.params.email },(err,result) => {
    console.log(result);
    if(result) {
      console.log('1');
      res.status(200).json({message: 'Yes'});
    } else {
      console.log('2');
      res.status(200).json({messege:'No'});
    }
  }).catch(err => {
    res.status(500).json({error:'err'+err});
  });
  });

router.post("/signup",(req,res,next) =>{
  console.log(req.body.email,req.body.password)
  const user= new User({
    email:req.body.email,
    password:req.body.password
    });
    user.save()
    .then(result => {
     res.status(201).json({mess:'User added!', result:result});
    })
    .catch(err => {
      res.status(500).json({error:"User exists!"});
    });
  });


router.post('/login',(req,res,next) =>{
       User.findOne({email:req.body.email}).then(user =>{
       if(!user ||user.password != req.body.password){
        res.status(401).json({token:null, message:'User dosent exist in the system Or The password is incorrect'});
        }
        else{
        const token = jwt.sign({email:user.email,userId:user._id,password:user.password},
                      'secret_this_should_be_longer',{expiresIn:'1h'});
                       res.status(200).json({token:token,message:"LogIn"});
                       }}).catch(err =>{
                         res.status(401).json({token: null, message:'post cannot get data'});

});

});


module.exports=router;
