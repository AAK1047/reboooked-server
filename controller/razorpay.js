const Razorpay = require("razorpay")


exports.orders=async(req,res)=>{
    
    const razorpay = new Razorpay({
        key_id: "rzp_test_UpXDNH6htyW2c",
        key_secret: "H0cv6mCuDDFrBD67xvrQJF79"
    })

    const options = {
        amount : req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture:1
    }

    try {
        const response = await razorpay.orders.create(options)
        res.status(200).json({
           order_id:response.id,
          currency: response.currency,
          amount:response.amount
        })
    }
    catch(error){
        res.status(401).json(error)
     }
     
}

exports.payments=async(req,res)=>{
    const {paymentId}=req.params

    const razorpay = new Razorpay({
        key_id: "rzp_test_UpXDNH6htyW2c",
        key_secret: "H0cv6mCuDDFrBD67xvrQJF79"
    })

    try {
        const payment =await razorpay.payments.fetch(paymentId)
        if(!payment){
            res.status(406).json("Error at razorpay loading")
        }
        res.status(200).json({
            status:payment.status,
            method:payment.method,
            amount:payment.amount,
           currency: payment.currency
         })
    }
    catch(error){
        res.status(401).json(error)
     }

}