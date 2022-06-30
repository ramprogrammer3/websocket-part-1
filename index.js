
const express = require('express')
const app = express()
const port = 8080
const http = require('http').createServer(app)
const io = require('socket.io')(http);


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

let userConnected = 0;

io.on("connection",(socket)=>{
    userConnected++;
    io.emit("connection", userConnected);
    console.log("user connected")
    socket.on("message",(userName,userMessage)=>{
        io.emit("message",userName,userMessage)
    })

    socket.on("deleteMessage",(id)=>{
        io.emit("deleteMessage",id)
    })

    socket.on("disconnect",()=>{
        userConnected--
        io.emit("connection", userConnected);
    })

})

http.listen(port,()=>{
    console.log(`server started running on port ${port}`);
})