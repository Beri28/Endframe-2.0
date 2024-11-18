import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/routes'
import mongoose from 'mongoose'
dotenv.config()
const app=express()

mongoose.connect(process.env.MONGOURL|| '').then(()=>{
    console.log("Connected to db")
}).catch((error)=>{
    console.log(error)
})
app.use(express.urlencoded())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}))
app.get('/',(req:Request,res:Response)=>{
    res.send("Endframe API. Proper docs coming soon")
})

app.use('/api',router)

app.listen(process.env.PORT,()=>{
    console.log("Server running on PORT:",process.env.PORT)
})