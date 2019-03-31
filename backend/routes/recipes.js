const express = require('express');
const RecipeS = require('../models/recipe');

const router = express.Router();
const checkauth = require('../middleware/check-auth')

router.get('',(req,res,next) => {
   RecipeS.find().then(doc => { res.status(200).json(doc);}).catch(err => {
  res.status(500).json({error:err});
});
  });

router.get('/:_id',(req,res,next) => {
  console.log( 'id get '+ req.params._id);
  RecipeS.findById(req.params._id,(err,ress) => {
    if(RecipeS){
      console.log("name : " + ress.name);
     res.status(200).json(ress);
    } else {
      err.status(500).json({messege:'The recipe not found'});
    }
  }).catch(err => {
    res.status(500).json({error:'err'+err});
  });
});


    router.post('',(req,res,next) => {
  const recipe = new RecipeS({
    _id: req.body._id,
    name:req.body.name,
    description:req.body.description,
    imgPath: req.body.imgPath,
    ingredient:req.body.ingredient
  });
  recipe.save().then(result => {
    console.log("save?  " + result);
     res.status(201).json({rec:result, messege:'Recipe Publish Added!!'});
  })
  .catch(err => {
    res.status(500).json({err:'not save'});
  });
});


  router.delete('/:_id',(req,res,next) => {
   RecipeS.deleteOne({_id:req.params._id }).then(result =>{
     console.log(result);
     res.status(201).json({ messege:'Deleted succeeded (app.js)'});
   }).catch((err) => {
    res.status(500).json({error:err});
  });
});


router.put('/:_id',(req,res,naxt) => {
  const recipe = {
  _id:req.body._id,
  name:req.body.name,
  description:req.body.description,
  imgPath: req.body.imgPath,
  ingredient:req.body.ingredient
  };
    RecipeS.updateOne({_id:req.params._id,},recipe).then(result => {
    console.log(result);
    res.status(200).json(recipe);
  }).catch(err =>{
    res.status(500).json({err:'this recipe isnt uppdate the message:'+err});

  })

 });


module.exports = router;
