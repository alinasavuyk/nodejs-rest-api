
const { 
  getContacts,
  getIdContacts,
  putContacts,
  postContacts,
  deleteContacts,
  updateStatusContact}=require('../services/contactsServis')

  const getContactsController=async (req, res, next) => {
const{_id: userId}=req.user;
const {
   skip=0,
   limit=5
}=req.query;
  limit>10?10:limit;

   const contacts= await getContacts(userId, {skip, limit})
     res.json({ contacts, skip, limit})
     }

const getIdContactsController=async (req, res) => {
   const {contactId}=req.params;
   const{_id: userId}=req.user;
  
   const contacts= await getIdContacts(contactId, userId)
    res.json({contacts, message: 'template message'})
    }

const putContactsController= async (req, res, next) => {
   const{_id: userId}=req.user;
   const{
    name,
    email,
    phone,
    }=req.body;
    const {contactId}=req.params;
    await putContacts(contactId,{name,email,phone}, userId)
   
    res.json({message: 'success OK put' })
   }

const deleteContactsController=async (req, res, next) => {
   const{_id: userId}=req.user;
 const {contactId}=req.params;
 await deleteContacts(contactId, userId)
    res.json({ message: 'success OK delete'})
   }
const postContactsController=async (req, res) => {
   const{_id: userId}=req.user;
    const{name,email,phone}=req.body;
    await postContacts({ name,email,phone}, userId)
    res.json({ status: 'success OK' })
    }
const patchIdContactsController=async (req, res) => {
   const{_id: userId}=req.user;
      const {contactId}=req.params;
      const{favorite}=req.body; 
      await updateStatusContact(contactId,{favorite},userId)
      res.json({ status: 'success OK' })
   }

 module.exports={
getContactsController,
getIdContactsController,
putContactsController,
postContactsController,
deleteContactsController,
patchIdContactsController}