const express=require('express')
const router=express.Router()
const multer = require('multer');
const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile=require('../firebasestorage/upload')
const productModel=require('../models/productModel')
const brandModel=require('../models/brandModel')
// const categoryModel=require('../models/categoryModel')

// const typeModel=require('../models/typeModel')


const validateToken=require('../middleware/validateToken')

router.get('/',validateToken,async(req,res)=>{
    try{
        const product=await productModel.find().populate(['brand'])
        res.status(200).json({data:product,message:'Success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})


router.get('/search',validateToken,async(req,res)=>{
    try{
        // console.log(req.query)
        let query={}
        if(req.query.query){
            query['title']={$regex:req.query?.query,$options:'i'}
        }
        if(req.query.range){
            let range=req.query.range.split('-').map(Number)
            let price={}
            if(range.length==2){
                price['$gte']=range[0]
                price['$lte']=range[1]
            }else{
                price['$gte']=req.query.range
            }
            query['price']=price
        }
        if(req.query.type){
            query['type']=req.query.type
        }
        if(req.query.brand){
            const resultbrand=await brandModel.findOne({name:req.query.brand})
            if(resultbrand){
                query['brand']=resultbrand._id
            } 
        }
        if(req.query.ram){
            let ramquerystr='|'+req.query.ram
            const sequence =ramquerystr.replace('|', '\\|');
            query['storage']={$regex:sequence}
        }
        if(req.query.processor){
            const sequence = req.query.processor.replace('|', '\\|');
            query['processor']={$regex:sequence}
        }

        const product=await productModel.find(query).populate(['brand'])
        const ram=new Map()
        const processor=new Map()
        const type=new Map()
        for(let pro of product){
            if(type.has(pro.type)){
                let value=type.get(pro.type)
                type.set(pro.type,value+1)
            }else{
                type.set(pro.type,1)
            }
            let processordata=pro.processor.split('|')
            if(processor.has(processordata[1]+'|'+processordata[2])){
                let value=processor.get(processordata[1]+'|'+processordata[2])
                processor.set(processordata[1]+'|'+processordata[2],value+1)
            }else{
                processor.set(processordata[1]+'|'+processordata[2],1)
            }

            let ramdata=pro.storage.split('|')
            if(ram.has(ramdata[1])){
                let value=ram.get(ramdata[1])
                ram.set(ramdata[1],value+1)
            }else{
                ram.set(ramdata[1],1)
            }
        }

        let ramarr=Array.from(ram)
        let processorarr=Array.from(processor)
        let typearr=Array.from(type)
        // console.log(typearr)
        res.status(200).json({data:product,typeresult:typearr,ramresult:ramarr,processorresult:processorarr,message:'Success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})


//single product
router.get('/:id',validateToken,async(req,res)=>{
    try{

        const product=await productModel.findById(req.params.id).populate(['brand'])
        res.status(200).json({data:product,message:'Success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.get('/brand/:name',validateToken,async(req,res)=>{
    try{
        let product=[]
        const brand=await brandModel.findOne({name:req.params.name})
        // console.log(category)
        if(brand){
            product=await productModel.find({brand:brand._id}).populate(['brand'])
        }else{
            return res.status(401).json({message:'Brand not found'})
        }
        res.status(200).json({data:product,message:'success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.post('/',upload.array('files'),validateToken,async(req,res)=>{
    try{
        const files = req.files;
        const picture=[]
        for(const file of files){
            const filename = `sumaho/product_img/${Date.now()}_${file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(file.buffer, filename, file.mimetype,uuid);
            let pictureobject={
                url:fileURL,
                filepath:filename
            }
            picture.push(
                pictureobject
            )
        }
        const product=new productModel({
            title:req.body.title,
            price:req.body.price,
            model:req.body.model,
            series:req.body.series,
            OS:req.body.OS,
            brand:req.body.brand,
            storage:req.body.storage,
            type:req.body.type,
            dimensions:req.body.dimensions,
            processor:req.body.processor,
            description:req.body.description,
            picture:picture
        })
        await product.save()
        res.status(200).json({message:`Product ${product.name} created`})
        // res.status(200).json({message:'done'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.put('/',upload.single('file'),validateToken,async(req,res)=>{
    try{

        if(!req.file){
            const product=await productModel.findByIdAndUpdate(req.body._id,req.body,{new:true})
          }else{
            const product=await productModel.findById(req.body._id)

            
            const filename = `sumaho/product_img/${Date.now()}_${req.file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
            const picture={
               url:fileURL,
               filepath:filename
            }
            product.title=req.body.title,
            product.price=req.body.price,
            product.model=req.body.model,
            product.series=req.body.series,
            product.OS=req.body.OS,
            product.brand=req.body.brand,
            product.storage=req.body.storage,
            product.type=req.body.type,
            product.dimensions=req.body.dimensions,
            product.processor=req.body.processor,
            product.description=req.body.description,
      
            product.picture.push(picture)
            const updateproduct=await productModel.findByIdAndUpdate(product._id,product,{new:true})
          }
          res.status(200).json({message:`Product Updated !`})

    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})



// router.post('/',async(req,res)=>{
//     try{
//         // console.log(req.body)
//         const type=new typeModel(req.body)
//         await type.save()
//         res.status(200).json({message:`Type ${type.name} created`})
//         // res.status(200).json({message:'done'})
//     }catch(err){
//         console.log(err)
//         res.status(500).json({message:'Internal Server Error'})
//     }
// })
router.put('/pic/:id',validateToken,async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        const picture=product.picture
        for(let i=0;i<picture.length;i++){
            if(picture[i].url===req.body.url){
                await bucket.file(picture[i].filepath).delete()
                picture.splice(i,1)
                i--
            }
        }
        product.picture=picture
        const updateproduct=await productModel.findByIdAndUpdate(product._id,product,{new:true})

        res.status(200).json({message:'Image deleted'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    } 
})

router.delete('/:id',validateToken,async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        const picture=product.picture
        for(const data of picture){
            await bucket.file(data.filepath).delete()
        }
        await productModel.findByIdAndDelete(product._id)
        res.status(200).json({message:'Delete Success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    } 
})

module.exports=router