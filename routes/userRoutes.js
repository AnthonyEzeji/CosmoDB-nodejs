const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const express = require('express')

const router = express.Router()

router.post('/createUser', async (req,res)=>{
    
    try {
        console.log(req.body)
        let user = new userModel(req.body)
        console.log(user)
        await user.save()

    } catch (error) {

        console.log(error)
    }
    
 })
 module.exports = router