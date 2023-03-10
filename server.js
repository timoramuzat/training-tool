const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT

app.use(express.static(__dirname + '/dist'));
app.all('*', function(req, res)
{ res.sendFile(__dirname + '/dist/index.html') })
const server = http.createServer(app);
server.listen(port, () => console.log(`App running on port ${port}`));
