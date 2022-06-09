const { status } = require('express/lib/response')
const {registration,login,logout}=require('../services/autsServis')

const registrationController=async(req, res)=>{
    const {
        email,
        password,
        subscription
    }=req.body
 await registration(email,password,subscription)
 res.json({status:'success'})
}
const loginController=async(req, res)=>{
    const {
        email,
        password
    }=req.body

  const token= await login(email,password)

  res.json({token,status:'success'})
}

const logoutController = async (req, res) => {
    const { _id } = req.user;
    await logout(_id )
  
   
  };

module.exports={
    registrationController,
    loginController,
   logoutController
}