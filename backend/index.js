import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./config/database.js";
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import ratingRoutes from './routes/ratingRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
import {app,server,io} from './socket/socket.js'

dotenv.config();

const PORT = process.env.PORT;
// const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/rating',ratingRoutes);
app.use('/api/v1/assignment',assignmentRoutes);
app.use('/api/v1/leaderboard',leaderboardRoutes);

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"server is running........"
    })
})

server.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
})
