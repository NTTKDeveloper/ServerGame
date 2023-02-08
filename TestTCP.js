const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws, red) {
  ws.on('message', function incoming(data_received) {
    let now = new Date ();
    writeLog_Msg(data_received, red, now);
    data_send = "data_send";
    ws.send(data_send.toString());
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})

//Hàm khi lại những messgage của client
function writeLog_Msg(msg, red, now){
    console.log('[ ' + now + ' ]' + ' Data received to ' 
                + red.socket.address().address + ':' 
                + red.socket.address().port + ' '  
                + ' Msg: ' + msg);
}