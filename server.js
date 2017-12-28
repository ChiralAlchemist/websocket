const express = require("express");
const app = express();


app.set("port", process.env.PORT || 5000);
const server = require('http').createServer(app);
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server : server });

wss.on('connection', function(ws, req){
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if(clientReady(client)){
        client.send(message)
      }
    })
  })
  ws.on('close', function close() {
    wss.clients.forEach(function (client) {
      if(clientReady(client)){
        //client.send('a user went offile ') // TODO say which user went offile
      }
    })
  })
  function clientReady(client) {
    return client !== ws && client.readyState === WebSocket.OPEN
  }
})

server.listen(app.get("port"), () => {
  console.log(`Find the server at:${server.address().port}/`); // eslint-disable-line no-console
});
