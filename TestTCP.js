const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    let now = new Date ();
    // alert (now);
    console.log('[' + now + ']' + 'Data received \n' + data)
    ws.send(data.toString());
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})