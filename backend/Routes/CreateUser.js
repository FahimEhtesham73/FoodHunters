const express =require('express');
const router =express.Router();
const user = require('../models/User')
const {body, validationResult}= require('express-validator');
const bcrypt= require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret= "mynameisfahim"

router.post("/CreateUser",
body('email').isEmail(),
body('name').isLength({min: 3}),
body('password', 'Incorrect Password').isLength({min: 5})
,async(req,res)=>{
    const errors= validationResult(req);
    console.log(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const salt = await bcrypt.genSalt(10)
    const securePass= await bcrypt.hash(req.body.password, salt)
    try {
        await user.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
            location: req.body.location
        }).then(res.json({success:true}))
        
    } catch (error) {
        console.log(error);
        res.json({success:false})
        
    }
})


router.post("/login",
body('email').isEmail(),
body('password', 'Incorrect Password').isLength({min: 5}),

async(req,res)=>{
  let email = req.body.email
  let password= req.body.password
  const errors= validationResult(req);
  console.log("body",req.body);
  if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
  }
    try {
       let userData= await user.findOne({email});
       console.log({userData});
        if (!userData){
            return res.status(400).json({errors:"Try loggin in with correct credentials"})
        }
        const pwdCompare = await bcrypt.compare(password, userData.password)
        if(!pwdCompare){
            return res.status(400).json({errors:"Try loggin in with correct credentials"})
        }
        if (userData.isAdmin) {
            const data = {
                user: {
                    id: userData.id
                },
                isAdmin: true
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.status(200).json({ success: true, authToken: authToken });
        } else {
            // For regular users
            const data = {
                user: {
                    id: userData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.status(200).json({ success: true, authToken: authToken });
        }

    } catch (error) {
        console.log({ error });
        res.json({ success: false });

    }
});
module.exports= router;