const mongoose= require('mongoose');
const uniquevalidator= require('mongoose-beautiful-unique-validation');

const UserSchema = mongoose.Schema({
  email:{type:String,require:true,unique:true},
  password:{type:String,require:true},
});

UserSchema.plugin(uniquevalidator);
module.exports = mongoose.model('User',UserSchema);
