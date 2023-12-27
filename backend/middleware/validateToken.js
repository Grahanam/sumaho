const jwt=require('jsonwebtoken')
const secretkey=process.env.SECRET_KEY


const validateToken=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(401).json({message:"Unauthorized!"})
    }
    jwt.verify(token,secretkey,(err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(401).json({message:"Unauthorized"})
        }
        next();
    })
}

module.exports=validateToken

