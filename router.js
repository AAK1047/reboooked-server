//import express 
const express = require('express')

const jwtmiddleware=require('./middleware/jwtmiddleware')

const multerconfig = require('./middleware/multermiddleware')

//import user controller
const userController= require('./controller/userController')

//import book controller
const  bookcontroller=require('./controller/bookconkroller')

//import cart controller
const cartcontroller=require('./controller/cartcontroller')

//instance router 
const router = new express.Router()

//import razorpay
const razorpay = require('./controller/razorpay')

//razorpay
router.post('/orders',razorpay.orders)

router.get('/payment/:id')


//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//all usser
router.get('/users',userController.alluser)

//add book 

router.post('/sellbook',jwtmiddleware, multerconfig.fields([
        { name: 'frontCover', maxCount: 1 }, // One file for front cover
        { name: 'backCover', maxCount: 1 },  // One file for back cover
        ]),
    bookcontroller.addbook)

//approve book
router.put('/approve-book/:id',bookcontroller.approvebook)

//order book
router.put('/order-book/:id',jwtmiddleware, bookcontroller.orderbook)

//reject book
router.put('/reject-book/:id',bookcontroller.rejectbook)

//remove book
router.delete('/remove-book/:id',bookcontroller.removebook)

//allbook
router.get('/all-books',bookcontroller.usergetallbook)

//allbook
router.get('/admin-all-books',bookcontroller.admingetallbook)  

//homebook
router.get('/home-books',bookcontroller.gethomebook)

//fictionbook
router.get('/fiction-books',bookcontroller.getfictionbook)

//fictionbook
router.get('/non-fiction-books',bookcontroller.getnonfictionbook)

//fictionbook
router.get('/text-books',bookcontroller.gettextbook)

//add to cart
router.post('/add-cart/:id',jwtmiddleware,cartcontroller.addtocart)

//edit profile
router.put('/editprofile',jwtmiddleware,userController.editprofile)

//get cart items
router.get('/get-cart',jwtmiddleware,cartcontroller.getcart)

//get selling orders
router.get('/get-sell-order',jwtmiddleware,bookcontroller.sellingorder)

//get ordered books
router.get('/ordered-books',jwtmiddleware,bookcontroller.orderedbook)

//add to cart
router.post('/remove-cart/:id',jwtmiddleware,cartcontroller.removefromcart)


module.exports = router