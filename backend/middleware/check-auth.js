const jwt= require('jsonwebtoken');

module.exports =(req,res,next) => {
try{
  const token= req.headers.authorization.split("")[1];
  console.log(token);
  /*const tokendata=*/jwt.verify(token,'secret_this_should_be_longer');
 // req.userdata= {email:tokendata.email,userid:tokendata.userid}
  next();
} catch(error){
  res.status(401).json({message:'Auth failed!'});
 }
}
