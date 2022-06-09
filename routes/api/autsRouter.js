const express = require('express')
const router = express.Router()

const { putContactsValidation, postContactsValidation, favoriteContactScheme } = require('../../middlewares/validationMiddlver');

const { registrationController,loginController, logoutController}=require("../../controllers/autsController")
const{asyncWrapper}=require('../../helpers/apiHelpers')




router.post('/registration', asyncWrapper(registrationController))
router.post('/login', asyncWrapper(loginController))
router.post('/logaut', asyncWrapper(logoutController))

module.exports =  router

