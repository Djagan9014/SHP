import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import itemrouter from './routes/itemRoutes.js';
import orderRouter from './routes/orderRoute.js';

mongoose
  .connect('mongodb+srv://dj9014:cBQj0xUEln4xzxAy@cluster1.eaxbcvc.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});



app.use('/api/items',res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app'), itemrouter)
app.use('/api/users',res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app'), userRouter);
app.use('/api/orders',res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app'), orderRouter)


