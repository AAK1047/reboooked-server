const mongoose = require('mongoose')

const bookschema = new mongoose.Schema({

    title:{
        required:true,
        type:String
    },
    author:{
        type:String
    },
    price:{
        required:true,
        type:String
    },
    condition:{
        required:true,
        type:String
    },
    type:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    frontCover:{
        required:true,
        type:String
    },
    backCover:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    },
    bookstatus:{
        required:true,
        type:String,
        default:"pending"
    }
    ,
    prinumber:{
        required:true,
        type:String,
        
    },
    secnumber:{
        required:true,
        type:String,
        
    }

})

//model
 
const books = mongoose.model('books',bookschema)
module.exports=books