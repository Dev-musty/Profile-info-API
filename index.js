import express from 'express';
import bodyParser from 'body-parser';
import  cors  from 'cors';
import env from 'dotenv';
import profile from './controller/profileInfoController.js';

// Configurations
env.config();
const app = express();
const port = process.env.PORT

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// Routes
app.get('/me',profile)


// express initialization
app.listen(port,()=>{
  console.log(`App running on port -> ${port}`)
})
