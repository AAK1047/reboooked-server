const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    userId :{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    books:{
        type:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:"books"}
        ]
    }
    


})

//model
 
const cartitems = mongoose.model('cartitems',cartSchema)
module.exports=cartitems