const cartitems = require("../model/cartmodel");


exports.addtocart=async(req,res)=>{

    const {id}=req.params
    const bookId=id
    console.log(bookId);
    
    const userId =req.payload
    console.log(userId);

    
    try {

        const existingItem= await cartitems.findOne({userId})
        if(existingItem){
             const updatecart=await cartitems.findOneAndUpdate({userId},{$addToSet:{books:bookId}},{new:true})
             res.status(200).json(updatecart)
            
        }
        else{
            const newcartitem =new cartitems({
               userId,
               books: [bookId]
            })
            await newcartitem.save()
            res.status(200).json(newcartitem)
        }
           
       
    } catch (error) {
        res.status(401).json(error)
    }

    }


exports.getcart=async(req,res)=>{
        
        const userId =req.payload
        console.log(userId);
        
        try {
    
            const existingItem= await cartitems.findOne({userId}).populate("books")
            if(existingItem){
                res.status(200).json(existingItem)
                 
            }
            else{
                res.status(406).json("no items in your cart")

            }
               
           
        } catch (error) {
            res.status(401).json(error)
        }
    
        }


exports.removefromcart=async(req,res)=>{

            const {id}=req.params
            const bookId=id
            console.log(bookId);
            
            const userId =req.payload
            console.log(userId);
        
            
            try {
        
                const existingItem= await cartitems.findOne({userId})
                if(existingItem){
                     const updatecart=await cartitems.findOneAndUpdate({userId},{$pull:{books:bookId}},{new:true})
                     res.status(200).json(updatecart)
                    
                }
                else{
                    
                    res.status(406).json("book not found")
                }
                   
               
            } catch (error) {
                res.status(401).json(error)
            }
        
            }
  