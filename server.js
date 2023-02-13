const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.FRONTEND_PORT

app.use(express.static(__dirname + '/dist'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
const server = http.createServer(app);
server.listen(port, () => console.log(`App running on port ${port}`));
