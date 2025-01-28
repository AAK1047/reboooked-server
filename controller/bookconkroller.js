const books = require("../model/bookmodel");

exports.addbook=async(req,res)=>{
    console.log("inside addproject");
    const{title,author,price,condition, type,description ,prinumber,secnumber}=req.body
    console.log(title,author,price,condition, type,description,prinumber,secnumber);
    
    let frontCover = req.files['frontCover']?.[0].filename;
   
    
    
     let backCover = req.files['backCover']?.[0].filename;

    
    const userId =req.payload
    console.log(userId);
    console.log(frontCover , backCover);
    
    
    try {

        
            const newbook =new books({
                title,author,price,condition,type,description, frontCover, 
                backCover,userId,prinumber,secnumber
            })
            await newbook.save()
            res.status(200).json(newbook)
       
    } catch (error) {
        res.status(401).json('book submission failed due to '+error)
    }

    }

   // Fetch books with status "pending" for admin
exports.admingetallbook = async (req, res) => {
    try {
      const pendingBooks = await books.find({ bookstatus: "pending" });
      if (pendingBooks.length > 0) {
        res.status(200).json(pendingBooks);
      } else {
        res.status(404).json("No pending books found");
      }
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  };

  //aprove books
  exports.approvebook = async (req, res) => {
    const {id}=req.params
    const bookId=id
    console.log(bookId);
       
   try {

    const existingBook =await books.findByIdAndUpdate({_id:bookId},{
       
        bookstatus:"listing"
    },{new:true})
    
    await existingBook.save()
    res.status(200).json(existingBook)

   } catch (error) {
    res.status(401).json(error)
   }
  };

  //reeject books
  exports.rejectbook = async (req, res) => {
    const {id}=req.params
    const bookId=id
    console.log(bookId);
       
   try {

    const existingBook =await books.findByIdAndUpdate({_id:bookId},{
       
        bookstatus:"rejected"
    },{new:true})
    
    await existingBook.save()
    res.status(200).json(existingBook)

   } catch (error) {
    res.status(401).json(error)
   }
  };

  
  // Fetch books with status "listing" for users
  exports.usergetallbook = async (req, res) => {
    const searchkey = req.query.search; 
      
        const query = {
          bookstatus: "listing",
        };
      
      
        if (searchkey) {
          query.title = {  
            $regex: searchkey,
            $options: 'i',  
          };
        }
    try {
      const listedBooks = await books.find(query);
      if (listedBooks.length > 0) {
        res.status(200).json(listedBooks);
      } else {
        res.status(404).json("No books available for listing");
      }
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  };

  


    exports.gethomebook=async(req, res)=>{
        try{
            const homebooks=await books.find({ bookstatus: "listing" }).limit(4)
            if(homebooks){
                res.status(200).json(homebooks)
    
            }
            else{
                res.status(406).json('no books found')
               
            }
        }
        catch(error){
            res.status(406).json('something went wrong')
             
        }
    
    }

    exports.getfictionbook = async (req, res) => {
        let searchkey = req.query.search; 

  
        const query = {
          bookstatus: "listing",
          type: "Fiction",
        };
      
      
        if (searchkey) {
          query.title = {  
            $regex: searchkey,
            $options: 'i',  
          };
        }
      
        try {
          const fictionbooks = await books.find(query);
          if (fictionbooks.length > 0) {
            res.status(200).json(fictionbooks);
          } else {
            res.status(406).json('No books found');
          }
        } catch (error) {
          res.status(406).json('Something went wrong');
        }
      };
      

    exports.getnonfictionbook=async(req, res)=>{
        const searchkey = req.query.search; 
      
        const query = {
          bookstatus: "listing",
          type: "Non-Fiction",
        };
      
      
        if (searchkey) {
          query.title = {  
            $regex: searchkey,
            $options: 'i',  
          };
        }
        try{
            const nonfictionbooks=await books.find(query)
            if(nonfictionbooks){
                res.status(200).json(nonfictionbooks)
    
            }
            else{
                res.status(406).json('no books found')
               
            }
        }
        catch(error){
            res.status(406).json('something went wrong')
             
        }
    
    }

    exports.gettextbook=async(req, res)=>{
        const searchkey = req.query.search; 
      
        const query = {
          bookstatus: "listing",
          type: "Textbooks",
        };
      
      
        if (searchkey) {
          query.title = {  
            $regex: searchkey,
            $options: 'i',  
          };
        }
        try{
            const textbooks=await books.find(query)
            if(textbooks){
                res.status(200).json(textbooks)
    
            }
            else{
                res.status(406).json('no books found')
               
            }
        }
        catch(error){
            res.status(406).json('something went wrong')
             
        }
    
    }

    exports.sellingorder = async (req, res) => {
      const userId =req.payload
      console.log(userId);
      
      try {
        const listingBooks = await books.find({ userId ,
          bookstatus: "listing" });
          const pendingBooks = await books.find({ userId ,
            bookstatus: "pending" });

            const rejectedBooks = await books.find({ userId ,
              bookstatus: "rejected" });
  
        if (listingBooks.length > 0 || pendingBooks.length>0 || rejectedBooks.length>0 ) {
          console.log(listingBooks,pendingBooks);
          
          res.status(200).json({listingBooks,pendingBooks,rejectedBooks});
        } else {
          res.status(404).json("No orderfound");
        }
      } catch (error) {
        res.status(500).json("Something went wrong");
      }
    };

    exports.removebook=async(req,res)=>{

      const {id}=req.params
      const bookId=id
      console.log(bookId);
      
      try {
  console.log("inside try");
  
          const existingItem= await books.findByIdAndDelete({_id:bookId})
          console.log(existingItem);
          
 
               res.status(200).json(existingItem)
              
             
         
      } catch (error) {
          res.status(401).json(error)
          console.log(error);
          
      }
  
      }



    

    

    