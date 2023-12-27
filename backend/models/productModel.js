const mongoose=require('mongoose')

const pictureSchema=new mongoose.Schema({
    url:{
        type:String,
    },
    filepath:{
        type:String,
    }
},{_id:false})

const productSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    model:{
        type:String,
    },
    series:{
        type:String,
    },
    price:{
        type:Number,
    },
    OS:{
        type:String,
    },
    storage:{
        type:String,
    },
    type:{
        type:String,
        enum:['ios','android','feature'],
    },
    dimensions:{
        type:String,
    },
    processor:{
        type:String,
    },
    picture:[pictureSchema],
    description:{
        type:String,
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
})

module.exports=mongoose.model('Product',productSchema)