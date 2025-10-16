import express from 'express';
import bodyParser from 'body-parser';
import  cors  from 'cors';
import env from 'dotenv';
import { rateLimit } from 'express-rate-limit'
import profile from './controller/profileInfoController.js';

// Configurations
env.config();
const app = express();
const limiter = rateLimit({
  windowMs: Number(process.env.WINDOW_MS),
  limit:Number(process.env.MAX_RATE), // 100 request every 15mins
  standardHeaders:true,
  legacyHeaders:false,
  ipv6Subnet:56,
  message: { error: 'Too many requests, please try again later.' },
  handler: (req, res, next, options) => res.status(options.statusCode).send(options.message)

})
console.log( Number(process.env.WINDOW_MS),Number(process.env.MAX_RATE))
// env
const port = process.env.PORT


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
}))




// Routes
app.get('/me',limiter,profile)



// express initialization
app.listen(port,()=>{
  console.log(`App running on port -> ${port}`)
})
