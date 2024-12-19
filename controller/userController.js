const jwt = require('jsonwebtoken')

// register

const users = require("../model/userModel");


exports.register=async(req,res)=>{
    //logic
    const {username,email,password}=req.body
    console.log(username,email,password);
    try{
        const existingUser= await users.findOne({email})
        if(existingUser){
            res.status(406).json('user already exist')
        }
        else{
           const newuser= new users({
            username,
            email,
            password,
            profile:"",
           })
           await newuser.save()
           res.status(200).json(newuser)
        }

    } catch(error){
       res.status(401).json(error)
    }
    
}

exports.login=async(req , res)=>{
    const {email , password }=req.body
    console.log(email , password);


   try {
    existingUser =await users.findOne({email,password})
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},'secretkey')
        res.status(200).json({existingUser , token})


    }
    else{
        res.status(406).json('incorrect email id or password')
    }
      
   } catch (error) {
    res.status(401).json(error)
   }
}

exports.alluser=async(req , res)=>{


   try {
    existingUser =await users.find({role:"user"})
    if(existingUser){
        res.status(200).json({existingUser})


    }
    else{
        res.status(406).json(error)
    }
      
   } catch (error) {
    res.status(401).json(error)
   }
}
