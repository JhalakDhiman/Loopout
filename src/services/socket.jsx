import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (courseId)=>{
    
    socketInstance = socket(process.env.REACT_APP_BASE_URL,{
        auth:{
            token:JSON.parse(localStorage.getItem("token"))
        },
        query:{
            courseId
        }
    })

    return socketInstance
}

export const receiveMessage = (eventName,cb)=>{
    socketInstance.on(eventName,cb);
}

export const sendMessage = (eventName,work)=>{
    socketInstance.emit(eventName,work);
}