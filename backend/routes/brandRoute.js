const express=require('express')
const router=express.Router()
const multer = require('multer');
const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile=require('../firebasestorage/upload')
const brandModel=require('../models/brandModel')

const validateToken=require('../middleware/validateToken')


router.get('/',validateToken,async(req,res)=>{
    try{
        const brand=await brandModel.find()
        res.status(200).json({data:brand,message:'Success'})
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
})


router.post('/',validateToken,upload.single('file'),async(req,res)=>{
    try{
        const file = req.file;
        const filename = `sumaho/brand_img/${Date.now()}_${req.file.originalname}`;
        const uuid=UUID()
        const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
        const brand=new brandModel({
            name:req.body.name,
            picture:{
                   url:fileURL,
                   filepath:filename
            }
        })
        await brand.save()
        res.status(200).json({message:`Brand ${brand.name} created`})
        // res.status(200).json({message:'done'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.put('/',validateToken,upload.single('file'),async(req,res)=>{
    try{
        if(!req.file){
            const brand=await brandModel.findByIdAndUpdate(req.body._id,req.body,{new:true})
          }else{
            const brand=await brandModel.findById(req.body._id)

            await bucket.file(brand.picture.filepath).delete()
            
            const filename = `sumaho/brand_img/${Date.now()}_${req.file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
            const picture={
               url:fileURL,
               filepath:filename
            }
            brand.name=req.body.name
            brand.picture=picture
            const updatebrand=await brandModel.findByIdAndUpdate(brand._id,brand,{new:true})
          }
          res.status(200).json({message:'Category Updated Successfully'})

    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.delete('/:id',validateToken,async(req,res)=>{
    try{
        const brand=await brandModel.findById(req.params.id)
        await bucket.file(brand.picture.filepath).delete()
        await brandModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Delete Success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    } 
})


module.exports=router