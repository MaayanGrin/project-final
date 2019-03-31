const mongoose= require('mongoose');

const ListIngredientSchema = mongoose.Schema({
  email:{type:String, require:true},
  name:{type:String,require:true},
  amount:{type:Number,require:true}
});
module.exports = mongoose.model(' ListIngredient',ListIngredientSchema);
