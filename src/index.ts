import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()
const app = express()

//middleware
app.use(cors())
// quy dinh cac ten mien truy cap server
app.use(morgan('dev'))
// ghi log
app.use(express.json())
// quy dinh dang data nhan
app.use(express.urlencoded())
// quy dinh data dang form html

//Database
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    autoIndex: false
}, (err) => {
    if(err) throw err;
    console.log('Mongodb connected')
})
//Routes
app.get('/', (req, res)=>{
    res.json({msg:'Hello DevAT'})
})

//Start server listening
const port = process.env.PORT || 5000;
// lay port default cua moi truong deloy
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`)
})