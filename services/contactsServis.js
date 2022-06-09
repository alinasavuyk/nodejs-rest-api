const {Contact}=require('../db/postModal')
const {WrongParametersError,UpdateParametersError, NotAuthorizedError}=require('../helpers/errors')

const getContacts=async(userId,  {skip,limit})=>{
   
    const contacts= await Contact.find({userId}).select({__v:0})
    .skip(skip).limit(limit).sort('favorite');
    return contacts
}

const getIdContacts= async(contactId,userId)=>{
    const contacts= await Contact.findOne({_id:contactId, userId});
    if(!contacts){
        throw new WrongParametersError(`failure, no user with id '${contactId}'`)
    }  
    return contacts
}

const putContacts=async(contactId,{ name,email,phone},userId)=>{
    const contacts =   await Contact.findOneAndUpdate(
        {$set:{ name,email,phone}},{_id:contactId, userId})
    return contacts
}

const postContacts= async ({name,email,phone}, userId)=>{
    const contacts= new Contact({ 
        name,
        email,
        phone,
        userId})
        const contact=     await contacts.save();   
return contact
    }

const deleteContacts=async(contactId, userId)=>{
    const contacts=  await Contact.findOneAndDelete({_id:contactId, userId});
return contacts
}

const updateStatusContact=async(contactId,{favorite}, userId)=>{
    const contacts =   await Contact.findOneAndUpdate({_id:contactId, userId}, {favorite})
   if(!contacts){
        throw new UpdateParametersError()
   }  
    return contacts
    
}

module.exports={
    getContacts,
    getIdContacts,
    putContacts,
    postContacts,
    deleteContacts,
    updateStatusContact
}