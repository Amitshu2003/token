const express = require('express');
const jwt = require("jsonwebtoken")
const fs = require('fs')

const app = express();

var privateKEY  = fs.readFileSync('./private.pem');
var publicKEY  = fs.readFileSync('./public.pem');

app.post('/sign',(req,res)=>{
    const token = jwt.sign(
        { random:__AmitShukla__},
        privateKEY,
        {
          expiresIn: "24h",
        }
      );
      return res.json({status:200, token:token});
})

app.post('/verify',(req,res)=>{
  try {
    const token = req.token;
    jwt.verify(token,publicKEY, function(err,payload){
      if(err){
        return res.json(err);
      }
      else
      return res.json(payload);
    })
    
  } catch (error) {
    return res.json({status:400 , message:"Invalid Token" })
  }
    
})



app.listen(3000,()=>{
    console.log('server running on ',3000);
})