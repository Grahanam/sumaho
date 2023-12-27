require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const {createServer}=require('node:http')
const path=require('path')
const cors=require('cors')
const app=express()
const port=process.env.PORT||4000
const url=process.env.url

const server=createServer(app)

//Routes
const productRoute=require('./routes/productRoute')
const brandRoute=require('./routes/brandRoute')


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(express.json({limit:'50mb'}))
app.use(cors())

// Route: api/proudct/
app.use('/api/product',productRoute)
// Route: api/brand/
app.use('/api/brand',brandRoute)





//starting server  
server.listen(port,()=>{
    console.log(`Listening on port:${port}`)
})



//Database
mongoose.connect(url)
const db=mongoose.connection
db.on('error',(error)=>{
    console.error('MongoDB connection error:',error)
})
db.once('open',()=>{
    console.log('Connected to MongoDB')
})