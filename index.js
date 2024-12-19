//import dotenv
require('dotenv').config()

//import express 
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router=require('./router')

//import connect
require('./connection')

//create server
const rbserver = express()

//serverusingcores
rbserver.use(cors())

//parse the data - middleware
rbserver.use(express.json())
 
//use router
rbserver.use(router)


//exporting upload folder
rbserver.use("/upload",express.static('./uploads'))

//port
const PORT = 4000 || process.env.PORT

//listen
rbserver.listen(PORT,()=>{
    console.log(`server running succesfully at server ${PORT}`);
    
})