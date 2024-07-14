import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import authrouter from './routes/authRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL

// middlewares 
app.use(cors({
    origin:process.env.ORIGIN,
    methods:['GET','POST','DELETE',"PUT",'PATCH',],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api',authrouter)

//database connection
async function dbConnection(){
    try {
        
        const db = await mongoose.connect(databaseUrl)
       console.log('data base connected')
       
    } catch (error) {
        console.log(error)
    }

}
dbConnection()

app.listen(8000,()=>{
    console.log('server started')
})