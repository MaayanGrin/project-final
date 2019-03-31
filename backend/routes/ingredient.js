const express = require('express');
const ListIngredient = require('../models/ingredient');

const router = express.Router();
const checkauth = require('../middleware/check-auth')

router.get('/:email',(req,res,next) => {
  console.log('userget ' +req.params.useremail);
  ListIngredient.find({email:req.params.email}).then(doc => { res.status(200).json(doc);}).catch(err => {
  res.status(500).json({error:err});
});
  });

router.get('/:_id',(req,res,next) => {
  ListIngredient.findById(req.params._id,(err,ress) => {
    if(ListIngredient){
      console.log("name all : " + ress.name);
     res.status(200).json(ress);
    } else {
      err.status(500).json({messege:'The recipe not found'});
    }
  }).catch(err => {
    res.status(500).json({error:'err'+err});
  });
});


    router.post('',(req,res,next) => {
    const ing= new ListIngredient({
    email:req.body.email,
    name:req.body.name,
    amount:req.body.amount,
  });
  ing.save().then(result => {
     res.status(201).json({ing:result, messege:'ingredient Added !!'});
  })
  .catch(err => {
    res.status(500).json({err:'not save'});
  });
});


  router.delete('/:_id',(req,res,next) => {
    ListIngredient.deleteOne({_id:req.params._id }).then(result =>{
     console.log(result);
     res.status(201).json({ messege:'Deleted succeeded'});
   }).catch((err) => {
    res.status(500).json({error:err});
  });
});


router.put('/:_id',(req,res,naxt) => {
  const ing = {
  _id:req.body._id,
  email:req.body.email,
  name:req.body.name,
  amount:req.body.amount,
  };
  ListIngredient.updateOne({_id:req.params._id},ing).then(result => {
    console.log(result.amount);
    res.status(200).json({ing:ing, messege:'Update Succeeded!!'});
  }).catch(err =>{
    res.status(500).json({err:'this ingredient isnt uppdate the message:'+err});
  })

 });


module.exports = router;
