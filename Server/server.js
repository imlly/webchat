const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.use(function(req,res){
    res.send("404");
});

var user_socket = {};
io.on("connection", function(socket){
    var username;
    socket.once('user_info', (user_info) => {
        user_socket[user_info.username] = socket;
        username = user_info.username;
        console.log("用户" + username + "已连接...");
    })
    socket.on('send message', (msg) => {
        console.log("客户发来的消息：" + msg.source + "要发给" + msg.des);
        socket.broadcast.emit(msg.des, msg);
    });
    // socket.on(username, (msg) => {
    //     socket.emit(username, msg);
    // })
    socket.on("disconnect", function(){
        console.log("有用户退出");
    });
});

var ser = server.listen(3000, function(){
    console.log("服务器已建立，持续监听中....")
});





