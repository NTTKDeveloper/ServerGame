const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })


function hearbeat(){
  console.log(this.isAlive);
  console.log("Pong");
  this.isAlive = true;
}

wss.on('connection', function connection(ws, red) {
  //Kết nối còn sống
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('message', function incoming(data) {
    console.log('data received \n' + data)
    ws.send(data.toString());
    // ws.ping();
  })
  //Bắt sự kiện pong
  ws.on('pong', hearbeat);
  //Thứ này hoạt động với android, 
  //Cái đm làm mình mò dụ ping pong mấy bữa nay.
  ws.on('close', function disconect(){
    console.log("Disconect");
  });
});

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})


const interval = setInterval(function pi(){
  wss.clients.forEach(function each(ws) {
    console.log(ws.isAlive);
    if(ws.isAlive === false) {
      console.log("Disconect!")
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 3000);

wss.on('close', function close(){
  clearInterval(interval);
});