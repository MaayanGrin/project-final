const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
/**paasswordmogo--vkhs0gUcYkMoHdLe */
//0wbUuuFxljUCk8j9

//kvWWiufnI8LDFDlY
const recipeRoutes =require('./routes/recipes');
const userRoutes =require('./routes/user');
const myrecipe =require('./routes/myrecipe');
const ingredient = require('./routes/ingredient');

mongoose.connect("mongodb+srv://maayan:vkhs0gUcYkMoHdLe@cluster0-vvhwn.mongodb.net/node-angular")
//mongoose.connect("mongodb+srv://Maayan:kvWWiufnI8LDFDlY@cluster0-pwlxd.mongodb.net/angular1")
.then(() =>{
  console.log('Connected to database');
})
.catch(() => {
  console.log('connection failed');
})

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept "/**Authorization */
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  next();
});

app.use('/recipe',recipeRoutes );

app.use('/user',userRoutes );

app.use('/myrecipe',myrecipe);

app.use('/Ingredient',ingredient);



module.exports= app;

