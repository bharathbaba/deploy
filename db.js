const mongoose =require ("mongoose");




var mongoURL='mongodb+srv://Bharath:Bharath1234@cluster0.euhwwhk.mongodb.net/mern-pizza'
 mongoose.connect(mongoURL,{useUnifiedTopology:true, useNewUrlParser:true})

 var db= mongoose.connection
  
 db.on('connected',()=>{
    console.log('Mongo db connected sucessfull')
    })
db.on('error',()=>{
        console.log('Mongo db connection failed')
})

module.exports =mongoose;