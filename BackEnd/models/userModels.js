import mongoose from "mongoose";
import {genSalt} from 'bcrypt'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email must be required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password must be required'],
        
    },
    firstName:{
        type:String,
        required:[true,'firstName must be required'],   
    },
    lastName:{
        type:String,
    },
    image:{
        type:String
    },
    profileSetup:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password)
    next()
})

const User = mongoose.model('users',userSchema)
export default User;