const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8080},()=>{
    console.log('Server Started')
})

wss.on('connection', function connection(ws) {
    ws.on('message', (data)=>{
        //Nhận data và in data gửi ra ngoài màn hình
        console.log('Data recevied: ' + data)
        ws.send(data);
    })
})

wss.on('listening',()=>{
    console.log('Listening on 8080')
})