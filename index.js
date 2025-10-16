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
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
}))

// Routes
app.get('/me',profile)

// Error handling middleware
// Ensure network timeouts and upstream errors return meaningful status codes
app.use((err, req, res, next) => {
  const statusCode = typeof err.status === 'number' ? err.status : 500
  const isTimeout = statusCode === 504
  const isUpstream = statusCode === 502
  const message = err?.message || (isTimeout ? 'Gateway Timeout' : isUpstream ? 'Bad Gateway' : 'Internal Server Error')
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', { message: err?.message, stack: err?.stack, status: statusCode })
  }
  return res.status(statusCode).json({
    status: 'error',
    message
  })
})


// express initialization
app.listen(port,()=>{
  console.log(`App running on port -> ${port}`)
})
