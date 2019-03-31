const express = require('express');
const MyRecipeS = require('../models/myrecipe');

const router = express.Router();
const checkauth = require('../middleware/check-auth')

router.get('/:email',(req,res,next) => {
  MyRecipeS.find({useremail:req.params.email}).then(doc => { res.status(200).json(doc);}).catch(err => {
  res.status(500).json({error:err});
});
  });

router.get('/:_id',(req,res,next) => {
  MyRecipeS.findById(req.params._id,(err,ress) => {
    if(MyRecipeS){
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
    console.log("post: " + req.body.email);
    console.log('post ' + req.body._id);
    console.log('post ' + req.body.name);
    console.log('post ' + req.body.description);

    const recipe = new MyRecipeS({
    //_id:req.body._id,
    useremail:req.body.email,
    name:req.body.name,
    description:req.body.description,
    imgPath: req.body.imgPath,
    ingredient:req.body.ingredient
  });
  recipe.save().then(result => {
     res.status(201).json({rec:result,messege:'Recipe Added !!'});
  })
  .catch(err => {
    res.status(500).json({err:'not save'});
  });
});


  router.delete('/:_id',(req,res,next) => {
    MyRecipeS.deleteOne({_id:req.params._id }).then(result =>{
     console.log(result);
     res.status(201).json({ messege:'Deleted succeeded'});
   }).catch((err) => {
    res.status(500).json({error:err});
  });
});


router.put('/:_id',(req,res,naxt) => {
  const recipe = {
  _id:req.body._id,
  useremail:req.body.email,
  name:req.body.name,
  description:req.body.description,
  imgPath: req.body.imgPath,
  ingredient:req.body.ingredient
  };
  MyRecipeS.updateOne({_id:req.params._id},recipe).then(result => {
    console.log(result);
    res.status(200).json({rec:recipe,messege:'Update Succeeded!!'});
  }).catch(err =>{
    res.status(500).json({err:'this recipe isnt uppdate the message:'+err});
  })

 });


module.exports = router;
