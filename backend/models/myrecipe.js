const mongoose= require('mongoose');

const IngredientSchema = mongoose.Schema({
  name:{type:String,require:true},
  amount:{type:Number,require:true}
});


const myrecipesSchema = mongoose.Schema({
  useremail:{type:String ,require:true},
  name:{type:String,require:true},
  description:{type:String,require:true},
  imgPath:{type:String,require:true},
  ingredient: [IngredientSchema]
});

module.exports = mongoose.model('MyRecipeS',myrecipesSchema);
