const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const groupModel = require('../models/groupModel')
const express = require('express')

const router = express.Router()



 router.post('/createUser', async (req,res)=>{
    
    try {
        let user = new userModel(req.body)
       let createdUser = await user.save().then((doc,err)=>{
        console.log(doc,err)
        if(err){
            console.log(err)
            return res.send(err)
        }
        if(doc!==null && doc!==undefined){
            console.log('yup')
            res.status(200).json(doc)
           }
           else{
            res.send({'message':'User not created'})
           }
       })
       
       

    } catch (error) {
        console.log(error)
        res.send(error)
    }
 })

 router.get('/allUsers',async (req,res)=>{
    try {
        console.log('Request for all users submitted')
        await userModel.find({}).then((docs,err)=>{
            if(err){
                return res.send(err)
            }
            if(docs.length>0){
                res.send(docs)
            }else{
                res.send({"message":"No documents found"})
            }
        })
    } catch (error) {
        res.send(error)
        console.log(error)
    }
 })
 router.patch('/addUserToGroup/:_id',async (req,res)=>{
    try {
        let _id = req?.params?._id
        let groupToAdd = req?.body?.groupToAdd
        let user = await userModel.findById(_id)
        let groupToAddDBDoc = await groupModel.findOne({name:groupToAdd})

        
        
        if(user!==null && user!==undefined){
            if(groupToAddDBDoc!==null && groupToAddDBDoc!==undefined){
                for(var i = 0; i<user?.groups?.length;i++){
                    if(user.groups[i]===groupToAdd){
                        return res.send({'message':'User already a member of selected group'})
                    }
                }
                await userModel.findByIdAndUpdate(user?._id,{groups:[...user?.groups,groupToAdd]},{new:true}).then((doc,err)=>{
                    if(err){
                        console.log(err)
                        return res.send(err)
                        
                    }
                    if(doc!==null && doc!==undefined){
                        console.log(groupToAddDBDoc?._id)
                       groupModel.findByIdAndUpdate(groupToAddDBDoc?._id,{members:[...groupToAddDBDoc?.members,user?.email]},{new:true}).then(doc2=>{
                        res.send({updatedUser:doc,updatedGroup:doc2})
                       })
                     
                        
                    }else{
                        res.send({"message":"User not updated"})
                    }
                })
            }
            }
         
    } catch (error) {
        res.send(error)
        console.log(error)
    }
 })
 router.patch('/removeUserFromGroup/:_id',async (req,res)=>{
    try {
        let _id = req?.params?._id
        let groupToRemoveName = req?.body?.groupToRemove
        let user = await userModel.findById(_id)
        let groupToRemoveDBDoc = await groupModel.findOne({name:groupToRemoveName})

        
        
        if(user!==null && user!==undefined){
            if(groupToRemoveDBDoc!==null && groupToRemoveDBDoc!==undefined){
             let userGroups = user.groups
             let updatedUserGroups = userGroups.filter((groupName)=>{
                return groupName !== groupToRemoveName
             })
             await userModel.findByIdAndUpdate(user?._id,{groups:updatedUserGroups},{new:true}).then((doc,err)=>{

               groupModel.findOneAndUpdate({ name: groupToRemoveName }, { $pullAll: {members: [user.email]}},{new:true}).then(doc2=>{
                res.send({updatedUser:doc,updatedGroup:doc2})
               });
             })
          
            }
            }
         
    } catch (error) {
        res.send(error)
        console.log(error)
    }
 })
 

 module.exports = router