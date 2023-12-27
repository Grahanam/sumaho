const mongoose=require('mongoose')

const brandSchema=new mongoose.Schema({
    name:{
        type:String 
    },
    picture:{
        url:{
            type:String
        },
        filepath:{
            type:String
        }
    }
})

module.exports=mongoose.model('Brand',brandSchema)