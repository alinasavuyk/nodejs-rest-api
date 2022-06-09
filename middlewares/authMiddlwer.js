const jwt=require('jsonwebtoken')

const {NotAuthorizedError}=require('../helpers/errors')



const authMiddlwer=(req,res,next)=>{
    const {authorization}=req.headers;
 const [ token]= authorization.split(' ');
if(!authorization){
    next(new NotAuthorizedError('Not authorized'))
}
if(!token){
    next(new NotAuthorizedError('Please, provide a token'))
}
try{
const user=jwt.decode(token,"secret" )
req.token=token;
req.user=user;
next()
}catch(error){
    next(new NotAuthorizedError('Invalid token'))
}

 
}

module.exports={
    authMiddlwer
}