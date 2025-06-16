import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db.js";

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());//allows us to use JSON data in the req.body


app.use(cors({
  origin: ['http://localhost:5173', 'https://product-store-mern-stack-frontend.onrender.com'],
  credentials: true
}));

app.use("/api/products",productRoutes);

app.listen(PORT,()=>{
   connectDB();
   console.log("Server Started at port "+ PORT);
});



