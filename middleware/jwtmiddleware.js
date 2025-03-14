const jwt = require('jsonwebtoken')

const jwtmiddleware=(req , res ,next)=>{
    console.log("inside jwt middleware");
    console.log( req.headers['authorization']);
    
    
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        const jwtresponse = jwt.verify(token,'secretkey')
        console.log(jwtresponse);
        req.payload=jwtresponse.userId
        
        next()
    } catch (error) {
        res.status(401).json('authorization failed due to'+error)
    }
    
   
    
}

module.exports = jwtmiddleware