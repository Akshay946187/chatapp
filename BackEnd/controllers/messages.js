import Message from '../models/messageModel.js'
import {mkdirSync, renameSync} from 'fs'


export const getMessages = async (req,res)=>{
    try {
        const user1 = req.userId
        const user2 = req.body.id

        if(!user1 || !user2){
            return res.status(400).send('both user are required')
        }
        const messages = await Message.find({
            $or:[
                {sender:user1,recipient:user2},
                {sender:user2,recipient:user1},
            ]
        }).sort({timestamp:1})
        return res.status(200).json({messages})
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const uploadFile = async (req,res)=>{
    try {
        const file = req.file
        if (!file) {
          return res.status(400).send({ message: "No file uploaded" })
        }
        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${req.file.originalname}`;
        mkdirSync(fileDir,{recursive:true})
        renameSync(req.file.path,fileName)

        return res.status(200).json({filePath:fileName})
    } catch (error) {
        return res.status(400).json({error})
    }
}