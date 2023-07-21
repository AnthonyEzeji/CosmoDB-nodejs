const mongoose = require('mongoose')
const groupModel = require('../models/groupModel')
const express = require('express')

const router  = express.Router()

router.get('/allGroups',async (req,res)=>{
    try {
        let AllGroups = null
        await groupModel.find({}).then((docs,err)=>{
            if(err){
                return res.send(err)
            }
            if(docs!==null && docs!==undefined){
                if(docs.length>0){
                    return res.send(docs)
                }
                else{
                    return res.send({'message':"No documents found"})
                }
            }else{
                return res.send({'message':"No documents found"})
            }
        })
    } catch (error) {
        return res.send(error)
    }
   
})
router.post('/createGroup',async (req,res)=>{

    try {
       let {groupName,groupId} = req.body
       let groupToCreate = null
       let allGroups = await groupModel.find({})
       if(groupId!==null && groupId !==undefined){
        
        if(groupName!==null && groupName !==undefined){
            for(var i = 0; i<allGroups?.length;i++){
                if(allGroups[i].name === groupName){
                    return res.send({'message':"Group already exists"})
                }
            }
            groupToCreate = new groupModel({name:groupName,_id:groupId,members:[]})
            await groupToCreate.save().then((doc,err)=>{
                if(err){
                    if(err.code === 11000)
                    {
                       return res.send({"message":"Group already exists"})
                    }
                    console.log(err)
                    return res.send(err)
                }
                if(doc!==null && doc!==undefined){
                    
                    console.log(groupToCreate)
                    return res.send(doc)
                }
                else{
                    return res.send({"message:":"Document not found"})
                }
                
            })
        }
       }
      
       
    } catch (error) {
        if(error?.code===11000){
            return res.send({"message":"Group already exists"})
        }
        return res.send(error)
    }
   
})

module.exports = router