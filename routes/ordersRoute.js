const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51NBtsoSIENl1iT7KuM8UOVFTvGzWcOjiPWPNaB68AAb83IiyCRBBZPgM1UkcoYU028f6c4kIu1xMRn7misddLUv8000UUVNSd5");
const Order=require('../models/orderModel');

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

 
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    

    const payment = await stripe.paymentIntents.create({
      amount: subtotal*100,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email
    }, {
      idempotencyKey: uuidv4()
    });

    if (payment) {
      const neworder=new Order({
        name:currentUser.name,
        email:currentUser.email,
        userid:currentUser._id,
        orderItems:cartItems,
        orderAmount:subtotal,
        shippingAddress:{
          street:token.card.address_line1,
          city:token.card.address_city,
          country:token.card.address_country,
          pincode:token.card.address_zip

        },
        transactionID : payment.id
      })
      neworder.save()
      res.send('Order Placed Successfully');
    } else {
      res.send('Payment failed');
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong', error: error.message });
  }
});

router.post("/getuserorders",async(req,res)=>{
  const {userid}=req.body
  try{
    const orders=await Order.find({userid:userid}).sort({_id:-1})

    res.send(orders)
  }
  catch(error)
  {
    res.status(400).json({ message: 'Something went wrong', error: error.message });
  }
})

module.exports = router;
