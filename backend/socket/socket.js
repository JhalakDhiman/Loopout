import { Server } from "socket.io";
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Course from '../models/course.js'
import jwt from 'jsonwebtoken'
import http from 'http'

const app = express();

dotenv.config();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['POST','GET','PUT'],
        credentials:true
    }
})

io.use(async(socket,next)=>{
    try{
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        const courseId = socket.handshake.query.courseId;

        if(!mongoose.Types.ObjectId.isValid(courseId)){
            return next(new Error("invalid course id"));
        }

        socket.course = await Course.findById(courseId);

        if(!token){
            return next(new Error("Authorization failed"));
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return next(new Error('Authentication failed'));
        }

        socket.user = decoded;
        next();
    } catch(error){
        console.log(error);
        next(error);
    }
})

io.on("connection",(socket)=>{
    socket.roomId = socket.course?._id.toString();
    console.log("user connnected");
    socket.join(socket.roomId);

    socket.on('message',data=>{
        console.log(data);
        socket.broadcast.to(socket.roomId).emit('message',data);
    })
})

export {server,io,app};
