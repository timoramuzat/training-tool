const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT

app.use(express.static(__dirname + '/dist'));
app.get('*', (req, res) => { console.log(`sending...`); res.sendFile(path.join(__dirname, 'index.html')); });
const server = http.createServer(app);
server.listen(port, () => console.log(`App running on port ${port}`));
