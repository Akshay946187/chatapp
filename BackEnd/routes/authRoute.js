import {Router} from 'express'
import { Signup } from '../controllers/auth.js'

const authrouter = Router()

authrouter.post('/signup',Signup)


export default authrouter