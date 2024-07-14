import User from "../models/userModels.js";
import jwt from 'jsonwebtoken'

const maxTime = 3*24*60*60*1000

const createToken = (email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxTime})

}

export const Signup = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.json({message:'all fileds are required'})
        }
        const user = await User.create({email,password})
        res.cookie('jwt',createToken(email,user.id),{
            maxTime,
            secure:true,
            sameSite:none
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).send('enternel server error')
    }
}