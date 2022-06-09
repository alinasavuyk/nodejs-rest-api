const mongoose = require('mongoose');
const contactsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  });

  const Contact = mongoose.model('Contact', contactsSchema);

  module.exports={
    Contact
  }