const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const {User}=require('../db/userModal')


const {NotAuthorizedError}=require('../helpers/errors')


const registration=async( email,password,subscription)=>{
  const user=new User({
    email,
    password,
    subscription
  })
    await user.save();
}

const login=async( email,password)=>{
const user = await User.findOne({email})
  if(!user)  {
      throw new NotAuthorizedError(`No user with email '${email}' found`)
  }
  if(!await bcrypt.compare(password, user.password)){
    throw new NotAuthorizedError(`Wrong password`)
  }

  const token=jwt.sign({
      _id:user._id
  },"secret")

  return token;
}

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

module.exports={
   registration,
   login,
   logout
}