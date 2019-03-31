const mongoose= require('mongoose');
const IngredientSchema = mongoose.Schema({
  name:{type:String,require:true},
  amount:{type:Number,require:true}
});

const recipesSchema = mongoose.Schema({
  name:{type:String,require:true},
  description:{type:String,require:true},
  imgPath: {type:String,require:true},
  ingredient: [IngredientSchema]
});

module.exports = mongoose.model('RecipeS',recipesSchema);
