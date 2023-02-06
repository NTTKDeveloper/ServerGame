//--------------------------------------------------------------------
//|                                                                  |
//|                 UDP Server Game (Nodejs & Unity)                 |
//|                                                                  |
//--------------------------------------------------------------------

const dgram = require('dgram');
const fs = require("fs");
const server = dgram.createSocket('udp4');
const collection = new Map();

const time = new Date();

server.on('error', (err)=>{
    console.log('server error: '+ err.stack);
    //Server nhận lỗi và đóng server
    server.close();
});

server.on('message', (msg, senderInfo) =>{
    //In tin nhắn đã nhận của người chơi
    console.log('Messages received ' + msg)
    //Server gửi tin nhắn từ người chơi
    server.sed(msg, senderInfo.port, senderInfo.address,()=>{
        console.log('Message sent to ' + senderInfo.address + ':' + senderInfo.port
                    + time.getMinutes())
    })
});

server.on('listening', () =>{
    // collection.set("Nathan", "555-0182");
    // collection.set("Jane", "555-0182");
    const address = server.address();
    console.log('Server listening on ' + address.address + ':' 
                    + address.port + " " + time.getMinutes());
    // console.log(collection.get("Nathan"));
    //Số lượng player trong server
    // console.log(collection.size);
});

server.bind(5500);
//Kiểm tra kết nối của player sau một 2s
setInterval(function () {console.log("Hey")}, 3000);